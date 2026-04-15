function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

export function isValidPhone(value) {
  const digits = digitsOnly(value);
  return digits.length >= 10;
}

export function buildWhatsAppUrl(phone, message) {
  const digits = digitsOnly(phone);
  const whatsappPhone =
    digits.length === 10 ? `91${digits}` : digits;

  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(email, subject, body) {
  const params = new URLSearchParams({
    subject,
    body
  });

  return `mailto:${email}?${params.toString()}`;
}

export function buildEnquiryMessage({
  context,
  name,
  phone,
  email,
  city,
  course,
  score,
  message
}) {
  const lines = [
    context,
    "",
    `Name: ${name || "-"}`,
    `Phone: ${phone || "-"}`,
    `Email: ${email || "-"}`,
    `City / State: ${city || "-"}`,
    `Course Interested In: ${course || "-"}`,
    `NEET Score: ${score || "-"}`
  ];

  if (message?.trim()) {
    lines.push("", "Message:", message.trim());
  }

  return lines.join("\n");
}
