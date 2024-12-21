import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";


export default async function(emailOptions) {

    const { email: recipientEmail } = emailOptions.recipient;
    const { subject, htmlContent, textContent } = emailOptions;

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_TOKEN,
    });

    const sender = new Sender("support@trial-neqvygmvwjwg0p7w.mlsender.net", "Logic Todo");
    const recipient = [new Recipient(recipientEmail, recipientEmail)];

    const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo(recipient)
      .setReplyTo(sender)
      .setSubject(subject)
      .setHtml(htmlContent)
      .setText(textContent);

    try {
        
       const res = await mailerSend.email.send(emailParams);
    } catch(err) {
        console.log(err);
    }
}

