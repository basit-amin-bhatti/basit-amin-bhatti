const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "bd867f6c-0d5b-420b-9a9a-1ff422c5f235";

const FALLBACK_ERROR_MESSAGE =
  "Your message could not be sent. Please try again shortly.";

export type Web3FormsContactSubmission = {
  company: string;
  companyFax: string;
  email: string;
  helpWith: string;
  message: string;
  name: string;
  website: string;
};

type Web3FormsResponse = {
  message?: string;
  success?: boolean;
};

export async function submitWithWeb3Forms(
  submission: Web3FormsContactSubmission,
  request: typeof fetch = fetch,
) {
  const { companyFax, ...fields } = submission;
  const response = await request(WEB3FORMS_ENDPOINT, {
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      botcheck: Boolean(companyFax),
      subject: `[Website] ${fields.helpWith} - ${fields.name}`,
      from_name: "Basit Amin Bhatti Website",
      ...fields,
      replyto: fields.email,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const payload = (await response
    .json()
    .catch(() => null)) as Web3FormsResponse | null;

  if (!response.ok || payload?.success !== true) {
    throw new Error(payload?.message ?? FALLBACK_ERROR_MESSAGE);
  }

  return payload;
}
