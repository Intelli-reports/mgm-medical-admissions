export const SITE_NAME = "BalaJi Admission Guidance";
export const SITE_SHORT_NAME = "BalaJi";
export const DEFAULT_DESCRIPTION =
  "Medical admission guidance platform for NEET UG counseling, college shortlisting, state-wise options, and detailed medical college research.";
export const DEFAULT_OG_IMAGE = "/image/mgm-admissions-office.png";
export const CONTACT_EMAIL = "balajieducationservices17@gmail.com";
export const CONTACT_PHONE = "+91-9324652984";
export const CONTACT_ADDRESS =
  "Haware Infotech Park, A-1401, Sector 30, Near Vashi Railway Station, Vashi, Navi Mumbai - 400703";

export function getSiteUrl() {
  const envUrl = import.meta.env.VITE_SITE_URL?.trim();

  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }

  return "";
}

export function makeAbsoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  const siteUrl = getSiteUrl();
  if (!siteUrl) return pathOrUrl;

  return `${siteUrl}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}
