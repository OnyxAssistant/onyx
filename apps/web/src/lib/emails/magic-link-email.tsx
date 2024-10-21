import React from "react";

type MagicLinkEmailProps = {
  actionUrl: string;
  firstName: string;
  mailType: "login" | "register";
};

export const MagicLinkEmail = ({
  firstName = "",
  actionUrl,
  mailType,
}: MagicLinkEmailProps) => (
  <html lang="en">
    <body>
      <style>
        {`
          body {
            background-color: white;
            font-family: sans-serif;
          }
          .container {
            margin: auto;
            padding-top: 20px;
            padding-bottom: 48px;
          }
          .text-base {
            font-size: 16px;
          }
          .my-5 {
            margin-top: 20px;
            margin-bottom: 20px;
          }
          .text-center {
            text-align: center;
          }
          .button {
            display: inline-block;
            border-radius: 8px;
            background-color: #18181b;
            padding: 8px 16px;
            font-size: 16px;
            color: white;
            text-decoration: none;
          }
        `}
      </style>
      <div className="container">
        <p className="text-base">Hi {firstName},</p>
        <p className="text-base">
          Welcome to Onyx. Click the link below to{" "}
          {mailType === "login" ? "sign in to" : "activate"} your account.
        </p>
        <div className="my-5 text-center">
          <a className="button" href={actionUrl}>
            {mailType === "login" ? "Sign in" : "Activate Account"}
          </a>
        </div>
        <p className="text-base">
          This link expires in 24 hours and can only be used once.
        </p>
        {mailType === "login" ? (
          <p className="text-base">
            If you did not try to log into your account, you can safely ignore
            this email.
          </p>
        ) : null}
      </div>
    </body>
  </html>
);

export default MagicLinkEmail;