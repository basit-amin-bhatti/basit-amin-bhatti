const CONTACT_TO_EMAIL = "hello@basitaminbhatti.me";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const MAX_BODY_BYTES = 16_000;

declare const process: {
  env: Record<string, string | undefined>;
};

const allowedHelpTopics = new Set([
  "Slow Lead Response",
  "Missed Calls",
  "Lead Qualification",
  "Follow-Up",
  "Inspection Booking",
  "CRM Automation",
]);

type ContactPayload = {
  name: string;
  email: string;
  company: string;
  website: string;
  helpWith: string;
  message: string;
  companyFax: string;
};

function json(message: string, status: number) {
  return Response.json(
    { message },
    {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json; charset=utf-8",
      },
      status,
    },
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanLine(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value
        .replace(/[\r\n\t]+/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim()
        .slice(0, maxLength)
    : "";
}

function cleanMessage(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function parsePayload(value: unknown): ContactPayload | null {
  if (!isRecord(value)) {
    return null;
  }

  const payload = {
    name: cleanLine(value.name, 100),
    email: cleanLine(value.email, 254).toLowerCase(),
    company: cleanLine(value.company, 150),
    website: cleanLine(value.website, 300),
    helpWith: cleanLine(value.helpWith, 100),
    message: cleanMessage(value.message, 3_000),
    companyFax: cleanLine(value.companyFax, 200),
  };

  if (
    payload.name.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
    payload.company.length < 2 ||
    !allowedHelpTopics.has(payload.helpWith) ||
    payload.message.length < 5
  ) {
    return null;
  }

  if (payload.website) {
    try {
      const website = new URL(payload.website);
      if (!["http:", "https:"].includes(website.protocol)) {
        return null;
      }
    } catch {
      return null;
    }
  }

  return payload;
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

function textEmail(payload: ContactPayload) {
  return [
    "New roofing strategy inquiry",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company}`,
    `Website: ${payload.website || "Not provided"}`,
    `Help needed: ${payload.helpWith}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

function htmlEmail(payload: ContactPayload) {
  const fields = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company", payload.company],
    ["Website", payload.website || "Not provided"],
    ["Help needed", payload.helpWith],
  ];

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#07100a;color:#eaf5e7;font-family:Arial,sans-serif;padding:32px">
    <div style="max-width:640px;margin:0 auto;background:#0b190f;border:1px solid #24532e;border-radius:16px;padding:28px">
      <p style="margin:0 0 8px;color:#7cff65;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">Website inquiry</p>
      <h1 style="margin:0 0 24px;font-size:24px">New roofing strategy inquiry</h1>
      <table role="presentation" style="width:100%;border-collapse:collapse">
        ${fields
          .map(
            ([label, value]) => `<tr>
          <td style="padding:10px 12px 10px 0;color:#9fb29f;vertical-align:top;width:120px">${escapeHtml(label)}</td>
          <td style="padding:10px 0;color:#eaf5e7">${escapeHtml(value)}</td>
        </tr>`,
          )
          .join("")}
      </table>
      <div style="margin-top:22px;border-top:1px solid #24532e;padding-top:22px">
        <p style="margin:0 0 8px;color:#9fb29f">Message</p>
        <p style="margin:0;white-space:pre-wrap;line-height:1.65">${escapeHtml(payload.message)}</p>
      </div>
    </div>
  </body>
</html>`;
}

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return new Response(null, {
        headers: { Allow: "POST", "Cache-Control": "no-store" },
        status: 405,
      });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return json("The submitted message is too large.", 413);
    }

    if (!request.headers.get("content-type")?.includes("application/json")) {
      return json("Please submit the contact form again.", 415);
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json("The submitted message is too large.", 413);
    }

    const body = (() => {
      try {
        return JSON.parse(rawBody) as unknown;
      } catch {
        return null;
      }
    })();
    const payload = parsePayload(body);
    if (!payload) {
      return json("Please review the form fields and try again.", 400);
    }

    // Silently accept bot submissions so the honeypot cannot be probed.
    if (payload.companyFax) {
      return json("Your message has been sent successfully.", 200);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !fromEmail) {
      console.error("Contact form email environment variables are not set.");
      return json(
        "Message delivery is temporarily unavailable. Please try again shortly.",
        503,
      );
    }

    let providerResponse: Response;
    try {
      providerResponse = await fetch(RESEND_ENDPOINT, {
        body: JSON.stringify({
          from: fromEmail,
          html: htmlEmail(payload),
          reply_to: payload.email,
          subject: `[Website] ${payload.helpWith} - ${payload.name}`,
          text: textEmail(payload),
          to: [CONTACT_TO_EMAIL],
        }),
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": crypto.randomUUID(),
        },
        method: "POST",
      });
    } catch {
      console.error("Contact email provider request failed.");
      return json(
        "Your message could not be delivered. Please try again shortly.",
        502,
      );
    }

    if (!providerResponse.ok) {
      console.error("Contact email provider rejected the request.", {
        status: providerResponse.status,
      });
      return json(
        "Your message could not be delivered. Please try again shortly.",
        502,
      );
    }

    return json("Your message has been sent successfully.", 200);
  },
};
