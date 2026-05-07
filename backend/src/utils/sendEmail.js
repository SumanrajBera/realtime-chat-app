import { config } from "../config/config.js";
import transporter from "../services/email.service.js";
import jwt from "jsonwebtoken"

export const sendEmail = async (user) => {
    const token = jwt.sign({
        email: user.email
    }, config.JWT_SECRET);

    const url = `http://localhost:3000/api/auth/verify-email?token=` + token;

    await transporter.sendMail({
        from: config.GOOGLE_USER,
        to: user.email,
        subject: `Verify your LetsChat account, ${user.username}!`,
        html: emailTemplate(user.username, url),
    })
}

function emailTemplate(user, url) {
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify your LetsChat account</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #0d0d0f;
      font-family: 'DM Sans', sans-serif;
      color: #e8e6f0;
      padding: 40px 16px;
      -webkit-font-smoothing: antialiased;
    }

   * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #f0f0f7;
      font-family: 'DM Sans', sans-serif;
      color: #1a1a2e;
      padding: 40px 16px;
      -webkit-font-smoothing: antialiased;
    }

    .wrapper {
      max-width: 560px;
      margin: 0 auto;
    }

    /* Header strip */
    .header {
      background: linear-gradient(135deg, #5b3cf5 0%, #8b5cf6 50%, #c026d3 100%);
      border-radius: 20px 20px 0 0;
      padding: 36px 40px 32px;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 200px; height: 200px;
      border-radius: 50%;
      background: rgba(255,255,255,0.12);
    }

    .header::after {
      content: '';
      position: absolute;
      bottom: -40px; left: -30px;
      width: 140px; height: 140px;
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
    }

    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;
      z-index: 1;
    }

    .logo-icon {
      width: 40px; height: 40px;
      background: rgba(255,255,255,0.25);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      border: 1px solid rgba(255,255,255,0.35);
    }

    .logo-text {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 22px;
      color: #fff;
      letter-spacing: -0.5px;
    }

    .logo-text span {
      opacity: 0.8;
    }

    .header-tagline {
      margin-top: 20px;
      font-family: 'Syne', sans-serif;
      font-size: 26px;
      font-weight: 700;
      color: #fff;
      line-height: 1.25;
      position: relative;
      z-index: 1;
    }

    .header-tagline em {
      font-style: normal;
      opacity: 0.75;
      font-weight: 400;
      font-size: 13px;
      display: block;
      margin-top: 4px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    /* Body card */
    .card {
      background: #ffffff;
      border: 1px solid #e2e0f0;
      border-top: none;
      padding: 40px 40px 36px;
    }

    .greeting {
      font-size: 15px;
      color: #5a5878;
      margin-bottom: 18px;
      line-height: 1.6;
    }

    .greeting strong {
      color: #1a1a2e;
      font-weight: 600;
    }

    /* Fallback link box */
    .link-box {
      background: #f5f4ff;
      border: 1px dashed #c4b5fd;
      border-radius: 10px;
      padding: 14px 18px;
      font-size: 12px;
      color: #5b3cf5;
      word-break: break-all;
      margin: 12px 0 0;
      font-family: 'Courier New', monospace;
      line-height: 1.6;
    }

    /* Divider */
    .divider {
      border: none;
      border-top: 1px solid #ede9ff;
      margin: 28px 0;
    }

    /* CTA button */
    .cta-wrap {
      text-align: center;
      margin: 28px 0;
    }

    .cta-wrap > a {
        color: #fff;
    }

    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, #5b3cf5, #c026d3);
      color: #fff;
      text-decoration: none;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 15px;
      padding: 16px 40px;
      border-radius: 12px;
      letter-spacing: 0.3px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(91, 60, 245, 0.35);
    }

    .cta-sub {
      margin-top: 12px;
      font-size: 12px;
      color: #9d9ab0;
    }

    /* Info block */
    .info-block {
      background: #f5f4ff;
      border-left: 3px solid #5b3cf5;
      border-radius: 0 8px 8px 0;
      padding: 14px 18px;
      margin: 24px 0;
    }

    .info-block p {
      font-size: 13px;
      color: #5a5878;
      line-height: 1.6;
    }

    .info-block p strong {
      color: #5b3cf5;
    }

    /* Footer */
    .footer {
      background: #f5f4ff;
      border: 1px solid #e2e0f0;
      border-top: none;
      border-radius: 0 0 20px 20px;
      padding: 24px 40px;
      text-align: center;
    }

    .footer-links {
      margin-bottom: 12px;
    }

    .footer-links a {
      color: #9d9ab0;
      font-size: 12px;
      text-decoration: none;
      margin: 0 10px;
    }

    .footer-links a:hover {
      color: #5b3cf5;
    }

    .footer-copy {
      font-size: 11px;
      color: #b8b5cc;
    }

    .footer-copy a {
      color: #5b3cf5;
      text-decoration: none;
    }

    /* Responsive */
    @media (max-width: 480px) {
      .header, .card, .footer {
        padding-left: 24px;
        padding-right: 24px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <div class="logo-row">
        <div class="logo-text">Lets<span>Chat</span></div>
      </div>
      <div class="header-tagline">
        Verify your email address
        <em>One step away from the conversation</em>
      </div>
    </div>

    <!-- Card Body -->
    <div class="card">

      <p class="greeting">
        Hey <strong>${user}</strong>. Welcome to LetsChat! We just need to confirm
        that this email address belongs to you before you can start chatting with the world.
      </p>

      <!-- CTA Button -->
      <div class="cta-wrap">
        <a href="${url}" class="cta-btn">Verify My Email</a>
      </div>

      <p class="greeting">
        If the button doesn't work, copy and paste this link into your browser:
      </p>

      <div class="link-box">
        ${url}
      </div>

      <p class="greeting" style="margin-top: 18px;">
        If you didn't create a LetsChat account, you can safely ignore this email —
        no action is needed.
      </p>

      <hr class="divider" />

      <!-- Security Note -->
      <div class="info-block">
        <p>
          <strong>🔒 Security tip:</strong> LetsChat will <strong>never</strong> ask for your
          verification code over chat or phone. If someone asks for this code, do not share it.
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-copy">
        © 2026 <a href="#">LetsChat Inc.</a> — All rights reserved.<br/>
        You're receiving this because you signed up at letschat.app
      </div>
    </div>

  </div>
</body>
</html>

    `
}