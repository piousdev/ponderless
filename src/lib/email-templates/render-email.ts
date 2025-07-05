"use server";

export interface EmailTemplateProps {
  email: string;
  message: string;
  submittedAt?: string;
}

export async function renderContactFormEmail(
  props: EmailTemplateProps,
): Promise<string> {
  const { email, message, submittedAt } = props;
  
  // Generate current timestamp if not provided
  const currentDate = new Date();
  const formattedDate = submittedAt || currentDate.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  // Escape HTML to prevent XSS
  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message);
  const escapedSubmittedAt = escapeHtml(formattedDate);

  // Ponderless Logo - Table-based for maximum email compatibility
  const ponderlessLogo = `<table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
    <tr>
      <td style="width: 48px; height: 48px; background-color: #3b82f6; border-radius: 12px; text-align: center; vertical-align: middle;">
        <span style="color: #ffffff; font-size: 24px; font-weight: 800; font-family: Arial, sans-serif; line-height: 48px;">P</span>
      </td>
    </tr>
  </table>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission - Ponderless</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 30px; text-align: center; background-color: #ffffff; border-bottom: 2px solid #e2e8f0;">
              <div style="margin-bottom: 20px;">
                ${ponderlessLogo}
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #1e293b; font-family: Arial, sans-serif;">Ponderless</h1>
              <p style="margin: 8px 0 0 0; font-size: 16px; color: #64748b; font-family: Arial, sans-serif;">New Contact Form Submission</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Contact Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #1e293b; font-family: Arial, sans-serif;">
                      <span style="display: inline-block; width: 8px; height: 8px; background-color: #22c55e; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
                      Contact Details
                    </h2>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 16px;">
                          <div style="font-size: 14px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; font-family: Arial, sans-serif;">Email</div>
                          <div style="font-size: 16px; color: #1e293b; font-weight: 600; padding: 12px 16px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; font-family: Arial, sans-serif;">
                            ${escapedEmail}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div style="font-size: 14px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; font-family: Arial, sans-serif;">Date</div>
                          <div style="font-size: 14px; color: #1e293b; font-weight: 500; padding: 8px 16px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; font-family: Arial, sans-serif;">
                            ${escapedSubmittedAt}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1e293b; font-family: Arial, sans-serif;">Message</h3>
                    <div style="font-size: 15px; color: #374151; line-height: 1.7; white-space: pre-wrap; background-color: #f8fafc; padding: 20px; border-radius: 6px; border-left: 3px solid #3b82f6; margin: 0; font-family: Arial, sans-serif;">
                      ${escapedMessage}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                <tr>
                  <td style="padding: 32px 24px; text-align: center;">
                    <p style="margin: 0 0 20px 0; font-size: 16px; color: #1e293b; font-weight: 500; font-family: Arial, sans-serif;">Ready to respond?</p>
                    <a href="mailto:${escapedEmail}" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 16px 32px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">
                      <span style="color: #ffffff;">Reply to ${escapedEmail}</span>
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 30px; text-align: center; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
              <div style="margin-bottom: 16px;">
                <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                  <tr>
                    <td style="width: 32px; height: 32px; background-color: #64748b; border-radius: 8px; text-align: center; vertical-align: middle;">
                      <span style="color: #ffffff; font-size: 16px; font-weight: 800; font-family: Arial, sans-serif; line-height: 32px;">P</span>
                    </td>
                  </tr>
                </table>
              </div>
              <p style="margin: 0 0 4px 0; font-weight: 600; color: #1e293b; font-size: 14px; font-family: Arial, sans-serif;">© ${new Date().getFullYear()} Ponderless</p>
              <p style="margin: 0; font-size: 12px; color: #64748b; font-family: Arial, sans-serif;">Contact form notification</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}