import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export default async function (emailOptions) {
  
  if (!emailOptions || typeof emailOptions !== "object") {
    throw Error("emailOptions must be an object");
  }

  const {
    subject,
    htmlContent,
    textContent,
    recipient: { email: recipientEmail },
  } = emailOptions;

  if (!subject || !htmlContent || !textContent || !recipientEmail) {
    throw Error(
      "subject, htmlContent, textContent and recipient properties must be present on emailOptions"
    );
  }

  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_TOKEN,
  });

  const sender = new Sender(
    "support@trial-neqvygmvwjwg0p7w.mlsender.net",
    "Logic Todo"
  );

  const recipient = [new Recipient(recipientEmail, recipientEmail)];

  const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo(recipient)
    .setReplyTo(sender)
    .setSubject(subject)
    .setHtml(htmlContent)
    .setText(textContent);

  // Send email
  await mailerSend.email.send(emailParams);
}
