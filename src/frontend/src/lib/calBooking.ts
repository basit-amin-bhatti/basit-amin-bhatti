export const CAL_BOOKING_URL =
  "https://cal.com/basitaminbhatti/roofing-growth-call";

const CAL_LINK = "basitaminbhatti/roofing-growth-call";
const CAL_NAMESPACE = "roofing-growth-call";
const CAL_EMBED_SRC = "https://app.cal.com/embed/embed.js";
const BOOKING_CTA_SELECTOR = '[data-cta="book-free-roofing-growth-call"]';
let isCalConfigured = false;

type CalQueue = unknown[][];

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalApi>;
  q?: CalQueue;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

function queueCall(api: CalApi, args: IArguments | unknown[]) {
  api.q = api.q ?? [];
  api.q.push(Array.from(args));
}

function loadCalEmbed() {
  if (window.Cal?.loaded) {
    return window.Cal;
  }

  const cal: CalApi = (...args: unknown[]) => {
    if (args[0] === "init") {
      const namespace = args[1];
      const namespaceApi: CalApi = (...namespaceArgs: unknown[]) => {
        queueCall(namespaceApi, namespaceArgs);
      };

      if (typeof namespace === "string") {
        cal.ns = cal.ns ?? {};
        cal.ns[namespace] = cal.ns[namespace] ?? namespaceApi;
        queueCall(cal.ns[namespace], args);
        queueCall(cal, ["initNamespace", namespace]);
      } else {
        queueCall(cal, args);
      }
      return;
    }

    queueCall(cal, args);
  };

  cal.loaded = true;
  cal.ns = {};
  cal.q = [];
  window.Cal = cal;

  const script = document.createElement("script");
  script.async = true;
  script.src = CAL_EMBED_SRC;
  script.dataset.calEmbed = "true";
  document.head.appendChild(script);

  return cal;
}

function configureBookingCta(element: Element) {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  element.setAttribute("aria-haspopup", "dialog");

  if (element instanceof HTMLAnchorElement) {
    element.href = CAL_BOOKING_URL;
  }
}

function configureBookingCtas(root: ParentNode = document) {
  root.querySelectorAll(BOOKING_CTA_SELECTOR).forEach(configureBookingCta);
}

function openBookingModal(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const bookingCta = target.closest(BOOKING_CTA_SELECTOR);
  const namespaceApi = window.Cal?.ns?.[CAL_NAMESPACE];
  if (!bookingCta || !namespaceApi) {
    return;
  }

  event.preventDefault();
  namespaceApi("modal", {
    calLink: CAL_LINK,
    config: {
      layout: "month_view",
      theme: "dark",
    },
  });
}

export function setupCalBooking() {
  const cal = loadCalEmbed();
  if (!isCalConfigured) {
    cal("init", CAL_NAMESPACE, { origin: "https://cal.com" });

    const namespaceApi = cal.ns?.[CAL_NAMESPACE];
    namespaceApi?.("ui", {
      cssVarsPerTheme: {
        dark: { "cal-brand": "#7cff65" },
        light: { "cal-brand": "#7cff65" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
    namespaceApi?.("preload", { calLink: CAL_LINK });
    isCalConfigured = true;
  }

  configureBookingCtas();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) {
          continue;
        }

        if (node.matches(BOOKING_CTA_SELECTOR)) {
          configureBookingCta(node);
        }
        configureBookingCtas(node);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener("click", openBookingModal);

  return () => {
    observer.disconnect();
    document.removeEventListener("click", openBookingModal);
  };
}
