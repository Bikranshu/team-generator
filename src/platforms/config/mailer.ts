import nodemailer from 'nodemailer';

import logger from './winston';
import * as emailTemplate from '../utils/email';

const senderEmail = '"City Remit Japan Application" <noreply@ctxpress.co.jp>';

const transporter = nodemailer.createTransport({
  host: (process.env as any).EMAIL_HOST,
  port: (process.env as any).EMAIL_PORT,
  secure: (process.env as any).EMAIL_SECURE ? (process.env as any).EMAIL_SECURE : false,
  auth: {
    user: (process.env as any).EMAIL_USER,
    pass: (process.env as any).EMAIL_PASSWORD,
  },
});

/**
 * Prepare payload for email.
 *
 * @param   {Object} params
 * @returns {Object}
 */
const preparePayLoad = (params: any) => {
  const html = emailTemplate.render(params?.template, params);

  return {
    from: senderEmail,
    to: params.email,
    subject: params.subject,
    text: 'Welcome to City Remit Japan Application',
    html,
  };
};

/**
 * Send email notification.
 *
 * @param   {Object} params [filename, email, subject]
 * @returns {Promise}
 */
export const notify = (params: any) => {
  let payload = preparePayLoad(params);
  return transporter
    .sendMail(payload)
    .then((info) => info)
    .catch((err) => {
      logger.log('error', 'Error sending notification to email:::', err);
    });
};
