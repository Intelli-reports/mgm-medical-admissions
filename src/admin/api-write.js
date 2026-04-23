/**
 * api-write.js — Minimal lead write API for public pages
 *
 * This module exists purely for performance:
 * - api.js imports collegePreviewData (all 9 college files ~100KB)
 * - ContactPage only needs createLead (~1KB of logic)
 * - This file imports ZERO college data, so ContactPage drops from 108KB → ~9KB
 *
 * Storage: writes to the SAME localStorage key as api.js, so
 * leads created here appear correctly in the admin console.
 */
import { ADMIN_STORAGE_KEY, normalizeLead, isoNow, makeAdminId } from "./contracts";

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/**
 * createLead — public-facing enquiry submission
 * Identical behaviour to api.js createLead, zero college data imported.
 */
export async function createLead(input) {
  const lead = normalizeLead(input);

  if (hasStorage()) {
    try {
      const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
      const store = raw ? JSON.parse(raw) : {};

      // Append lead
      const leads = Array.isArray(store.leads) ? store.leads : [];
      leads.unshift(lead);

      // Append notification (visible in admin dashboard)
      const notifications = Array.isArray(store.notifications) ? store.notifications : [];
      notifications.unshift({
        id: makeAdminId("notification"),
        title: `New ${lead.source.replace(/-/g, " ")} lead`,
        text: `${lead.name} submitted a ${lead.course || "general"} enquiry.`,
        createdAt: isoNow(),
        read: false
      });

      window.localStorage.setItem(
        ADMIN_STORAGE_KEY,
        JSON.stringify({
          ...store,
          leads: leads.slice(0, 500),
          notifications: notifications.slice(0, 24)
        })
      );
    } catch {
      // localStorage unavailable — lead still returned for WhatsApp flow
    }
  }

  return lead;
}
