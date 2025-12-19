import { Resend } from "resend";
const dotenv = await import("dotenv");
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);
async function sendMail({ from, to, subject, html, }) {
    const { data, error } = await resend.emails.send({
        from: from, // e.g., 'Your App <noreply@yourdomain.com>'
        to: to,
        subject: subject,
        html: html,
    });
    return { data, error };
}
export { sendMail };
//# sourceMappingURL=resend.js.map