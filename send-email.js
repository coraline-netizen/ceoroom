// ─── CEO Room — Netlify Function : envoi emails via Resend ──────────────────
// Déploiement : placer dans /netlify/functions/send-email.js
// Variable d'env Netlify : RESEND_API_KEY = re_XJCGtybb_...

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL     = 'CEO Room <coraline@womenwithaplan.fr>';
const APP_URL        = 'https://ceoroom.netlify.app';

// ─── Templates ───────────────────────────────────────────────────────────────

function tplBienvenue({ prenom, email }) {
  return {
    subject: `Bienvenue dans CEO Room, ${prenom} 👋`,
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue dans CEO Room</title>
</head>
<body style="margin:0;padding:0;background:#f5f3ef;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ef;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

        <!-- En-tête -->
        <tr>
          <td style="background:#0d0d0d;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#c9a84c;font-size:11px;letter-spacing:4px;text-transform:uppercase;font-family:sans-serif;">Women With A Plan</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:28px;letter-spacing:1px;">CEO Room</h1>
          </td>
        </tr>

        <!-- Corps -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <h2 style="margin:0 0 16px;color:#0d0d0d;font-size:22px;">Ton espace est prêt, ${prenom}.</h2>
            <p style="margin:0 0 20px;color:#444;font-size:16px;line-height:1.7;">
              Bienvenue dans CEO Room — l'espace stratégique conçu pour que ton business travaille <em>pour toi</em>.
            </p>
            <p style="margin:0 0 20px;color:#444;font-size:16px;line-height:1.7;">
              Tu peux maintenant accéder à ton tableau de bord, définir tes objectifs financiers, structurer tes offres, et piloter ta rentabilité semaine après semaine.
            </p>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:32px 0;">
              <tr>
                <td style="background:#0d0d0d;border-radius:8px;">
                  <a href="${APP_URL}" style="display:inline-block;padding:14px 32px;color:#c9a84c;text-decoration:none;font-family:sans-serif;font-size:14px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                    Accéder à mon espace →
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px;color:#666;font-size:14px;line-height:1.6;">
              Ton compte est associé à cette adresse email : <strong>${email}</strong>
            </p>
            <p style="margin:0;color:#666;font-size:14px;line-height:1.6;">
              Si tu as des questions, réponds directement à cet email.
            </p>
          </td>
        </tr>

        <!-- Séparateur -->
        <tr>
          <td style="padding:0 40px;">
            <hr style="border:none;border-top:1px solid #e8e4dc;margin:0;">
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#999;font-size:12px;font-family:sans-serif;">
              Women With A Plan · CEO Room<br>
              Tu reçois cet email car tu viens de créer un compte.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
  };
}

function tplMotDePasseOublie({ prenom, email, tempPassword }) {
  return {
    subject: `Réinitialisation de ton mot de passe CEO Room`,
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Réinitialisation mot de passe</title>
</head>
<body style="margin:0;padding:0;background:#f5f3ef;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ef;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

        <!-- En-tête -->
        <tr>
          <td style="background:#0d0d0d;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#c9a84c;font-size:11px;letter-spacing:4px;text-transform:uppercase;font-family:sans-serif;">Women With A Plan</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:28px;letter-spacing:1px;">CEO Room</h1>
          </td>
        </tr>

        <!-- Corps -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <h2 style="margin:0 0 16px;color:#0d0d0d;font-size:22px;">Réinitialisation de ton mot de passe</h2>
            <p style="margin:0 0 20px;color:#444;font-size:16px;line-height:1.7;">
              Bonjour ${prenom || ''},<br><br>
              Une demande de réinitialisation a été effectuée pour le compte associé à <strong>${email}</strong>.
            </p>
            <p style="margin:0 0 12px;color:#444;font-size:15px;line-height:1.6;">
              Voici ton mot de passe temporaire :
            </p>

            <!-- Mot de passe mis en valeur -->
            <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
              <tr>
                <td style="background:#f5f3ef;border:2px solid #c9a84c;border-radius:8px;padding:16px 32px;">
                  <code style="font-size:22px;font-family:monospace;letter-spacing:4px;color:#0d0d0d;font-weight:bold;">${tempPassword}</code>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 20px;color:#666;font-size:14px;line-height:1.6;">
              Connecte-toi avec ce mot de passe, puis change-le immédiatement depuis <strong>Mon compte → Changer mon mot de passe</strong>.
            </p>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:8px 0 32px;">
              <tr>
                <td style="background:#0d0d0d;border-radius:8px;">
                  <a href="${APP_URL}" style="display:inline-block;padding:14px 32px;color:#c9a84c;text-decoration:none;font-family:sans-serif;font-size:14px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                    Se connecter →
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0;color:#999;font-size:13px;line-height:1.6;">
              Si tu n'as pas fait cette demande, ignore cet email. Ton mot de passe actuel reste inchangé.
            </p>
          </td>
        </tr>

        <!-- Séparateur -->
        <tr>
          <td style="padding:0 40px;">
            <hr style="border:none;border-top:1px solid #e8e4dc;margin:0;">
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#999;font-size:12px;font-family:sans-serif;">
              Women With A Plan · CEO Room<br>
              Tu reçois cet email car une réinitialisation a été demandée.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
  };
}

// ─── Handler principal ────────────────────────────────────────────────────────

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { type, prenom, email, tempPassword } = body;

  if (!type || !email) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'type et email requis' }) };
  }

  // Choisir le template
  let tpl;
  if (type === 'bienvenue') {
    tpl = tplBienvenue({ prenom, email });
  } else if (type === 'reset') {
    if (!tempPassword) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'tempPassword requis pour type=reset' }) };
    }
    tpl = tplMotDePasseOublie({ prenom, email, tempPassword });
  } else {
    return { statusCode: 400, headers, body: JSON.stringify({ error: `Type inconnu : ${type}` }) };
  }

  // Appel API Resend
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: tpl.subject,
        html: tpl.html
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend error:', data);
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur Resend', detail: data }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, id: data.id }) };

  } catch (err) {
    console.error('Network error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur réseau', detail: err.message }) };
  }
};
