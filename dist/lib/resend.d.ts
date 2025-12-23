declare function sendMail({ from, to, subject, html, }: {
    from: string;
    to: string;
    subject: string;
    html: string;
}): Promise<{
    data: import("resend").CreateEmailResponseSuccess | null;
    error: import("resend").ErrorResponse | null;
}>;
export { sendMail };
//# sourceMappingURL=resend.d.ts.map