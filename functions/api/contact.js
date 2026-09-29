/**
 * Cloudflare Pages Function — POST /api/contact
 * File lives at:  functions/api/contact.js
 * (Cloudflare maps the path automatically)
 *
 * Environment variable required (set in CF Pages dashboard):
 *   RESEND_API_KEY  →  re_xxxxxxxxxxxxxxxxxx
 *
 * Resend "from" address must use a verified domain.
 * During testing you can use: onboarding@resend.dev
 * Production: noreply@liftservicebel.com  (once domain is verified in Resend)
 */

const RECIPIENT = "liftservicebel@gmail.com";
const FROM = "Lift Service <noreply@liftservicebel.com>";
const RESEND_URL = "https://api.resend.com/emails";

// Only handle POST — CF returns 405 automatically for other methods
export async function onRequestPost({ request, env }) {
  /* ── 1. Parse body ───────────────────────────────────────── */
  let body;
  const ct = request.headers.get("content-type") ?? "";

  try {
    if (ct.includes("application/json")) {
      body = await request.json();
    } else {
      // fallback: form-encoded
      const fd = await request.formData();
      body = Object.fromEntries(fd);
    }
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const { sender_name, sender_email, service, message } = body;

  /* ── 2. Server-side validation ───────────────────────────── */
  const errors = [];
  if (!sender_name?.trim()) errors.push("Nom requis.");
  if (!sender_email?.trim() || !isValidEmail(sender_email))
    errors.push("Email invalide.");
  if (!message?.trim()) errors.push("Message requis.");

  if (errors.length) {
    return jsonResponse({ error: errors.join(" ") }, 422);
  }

  /* ── 3. Call Resend ──────────────────────────────────────── */
  const resendRes = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [RECIPIENT],
      reply_to: sender_email.trim(),
      subject: `📦 Nouveau message – ${sanitize(sender_name)}`,
      html: buildEmail({ sender_name, sender_email, service, message }),
      // Plain-text fallback
      text: [
        `Nom    : ${sender_name}`,
        `Email  : ${sender_email}`,
        `Service: ${service ?? "Non précisé"}`,
        ``,
        message,
      ].join("\n"),
    }),
  });

  if (!resendRes.ok) {
    const detail = await resendRes.json().catch(() => ({}));
    console.error("Resend error:", detail);
    return jsonResponse({ error: "Erreur lors de l'envoi. Réessayez." }, 500);
  }

  return jsonResponse({ success: true }, 200);
}

/* ── Helpers ─────────────────────────────────────────────────── */

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str) {
  return String(str ?? "")
    .replace(/[<>&"]/g, "")
    .trim()
    .slice(0, 100);
}

function sanitizeLong(str) {
  return String(str ?? "")
    .replace(/[<>&"]/g, "")
    .trim(); // ← no slice limit for messages
}

/* ── Email HTML template ─────────────────────────────────────── */
function buildEmail({ sender_name, sender_email, service, message }) {
  const serviceLabel =
    {
      "monte-meubles": "Monte-meubles",
      "camion-chauffeur": "Camion + chauffeur",
      "demenagement-mesure": "Déménagement sur mesure",
      fournitures: "Fournitures",
    }[service] ?? "Non précisé";

  return /* html */ `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Nouveau message</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f3e5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3e5;padding:40px 16px;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width:560px;background:#ffffff;border-radius:2px;border:1px solid rgba(28,26,23,0.1);overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="background:#27334b;padding:28px 36px;">
                <p style="margin:0;font-size:11px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#b8a98a;">
                  Lift Service Déménagement
                </p>
                <h1 style="margin:8px 0 0;font-size:22px;font-weight:400;color:#f5f3e5;letter-spacing:-0.01em;">
                  Nouveau message reçu
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px 36px;">

                <!-- Sender info -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid rgba(28,26,23,0.07);">
                      <p style="margin:0;font-size:10px;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:#b8a98a;">Nom</p>
                      <p style="margin:4px 0 0;font-size:15px;color:#1c1a17;">${sanitize(sender_name)}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid rgba(28,26,23,0.07);">
                      <p style="margin:0;font-size:10px;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:#b8a98a;">Email</p>
                      <p style="margin:4px 0 0;font-size:15px;">
                        <a href="mailto:${sanitize(sender_email)}" style="color:#27334b;text-decoration:none;">${sanitize(sender_email)}</a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid rgba(28,26,23,0.07);">
                      <p style="margin:0;font-size:10px;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:#b8a98a;">Service demandé</p>
                      <p style="margin:4px 0 0;font-size:15px;color:#1c1a17;">${serviceLabel}</p>
                    </td>
                  </tr>
                </table>

                <!-- Message -->
                <p style="margin:0 0 8px;font-size:10px;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:#b8a98a;">Message</p>
                <div style="background:#f5f3e5;border-left:2px solid #b8a98a;padding:16px 20px;border-radius:1px;">
                  <p style="margin:0;font-size:15px;line-height:1.75;color:#4e4e4e;white-space:pre-wrap;">${sanitizeLong(message)}</p>
                </div>

                <!-- CTA -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                  <tr>
                    <td>
                      <a href="mailto:${sanitize(sender_email)}"
                        style="display:inline-block;background:#27334b;color:#f5f3e5;text-decoration:none;
                                font-size:11px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;
                                padding:12px 24px;border-radius:2px;">
                        Répondre au message
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f5f3e5;border-top:1px solid rgba(28,26,23,0.08);padding:20px 36px;">
                <p style="margin:0;font-size:11px;color:#9a9690;line-height:1.6;">
                  Lift Service Déménagement · Av. Wielemans Ceuppens 158, 1190 Forest, Bruxelles<br>
                  Ce message a été envoyé depuis le formulaire de contact de
                  <a href="https://www.liftservicebel.com" style="color:#9a9690;">liftservicebel.com</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
    `.trim();
}
