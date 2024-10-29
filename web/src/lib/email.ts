import { Resend } from 'resend';

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export function isResendInitialized(): boolean {
  return resend !== null;
}
