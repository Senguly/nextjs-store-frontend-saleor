export const getApiUrl = () => {
  const isCheckCurDomain =
    process.env.NEXT_PUBLIC_API_WITH_CURRENT_DOMAIN === "true";
  if (isCheckCurDomain) {
    if (typeof window !== "undefined") {
      const { protocol, hostname } = window.location;
      return `${protocol}//${hostname}/graphql`;
    }
    return process.env.NEXT_PUBLIC_API_URI!;
  }
  return process.env.NEXT_PUBLIC_API_URI!;
};

export const apiUrl = getApiUrl();

export const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

const sampleRate = parseFloat(process.env.NEXT_PUBLIC_SENTRY_APM || "");

export const sentrySampleRate = isNaN(sampleRate) ? 0 : sampleRate;

export const serviceWorkerTimeout =
  parseInt(process.env.SERVICE_WORKER_TIMEOUT || "", 10) || 60 * 1000;

export const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const channelSlug = process.env.NEXT_PUBLIC_SALEOR_CHANNEL_SLUG!;

export const countryCode = process.env.NEXT_PUBLIC_SALEOR_COUNTRY_CODE!;

export const exportMode = process.env.NEXT_EXPORT === "true";

export const ssrMode = typeof window === "undefined";

export const incrementalStaticRegenerationRevalidate = parseInt(
  process.env.INCREMENTAL_STATIC_REGENERATION_REVALIDATE!,
  10
);

export const staticPathsFetchBatch = 50;

export const staticPathsFallback = (exportMode
  ? false
  : process.env.NEXT_PUBLIC_STATIC_PATHS_FALLBACK) as boolean | "blocking";
