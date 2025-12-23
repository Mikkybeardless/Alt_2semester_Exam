import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ErrorWithStatus } from "../exception/errorWithStatus.exception.js";
import { User } from "../database/schema/user.schema.js";
import { resetPasswordHtml } from "../EmailTemplates/reset-password.js";
import { sendMail } from "../lib/resend.js";
export const login = async (email, password) => {
    // check if email exist
    const user = await User.findOne({ email });
    if (!user) {
        throw new ErrorWithStatus("User not found", 404);
    }
    // check if password is incorrect
    if (!bcrypt.compareSync(password, user.password)) {
        throw new ErrorWithStatus("Email or password Incorrect", 401);
    }
    // generate access token
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({
        role: user.role || "USER",
        email: user.email,
        name: user.first_name,
        id: user._id,
        sub: user._id,
    }, JWT_SECRET, { expiresIn: "1h" });
    return token;
};
export const register = async ({ first_name, last_name, email, password, role, }) => {
    const user = await User.findOne({ email });
    //  check if email exists
    if (user) {
        throw new ErrorWithStatus("User with this email already Exist", 400);
    }
    password = await bcrypt.hash(password, 10);
    const newUser = new User({
        first_name,
        last_name,
        email,
        password,
        role,
    });
    await newUser.save();
    return newUser;
};
export const forgotPassword = async (email, resetUrl) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new ErrorWithStatus("User not found", 404);
    }
    const restToken = user.createPasswordResetToken();
    await user.save();
    // Construct the reset link using frontend's URL
    const resetLink = `${resetUrl}?token=${restToken}&email=${encodeURIComponent(email)}`;
    const html = resetPasswordHtml(resetLink);
    const emailFrom = process.env.RESEND_FROM_EMAIL || "mikkybeardless@gmail.com";
    const { data, error } = await sendMail({
        from: emailFrom,
        to: email,
        subject: "Password Reset Request",
        html: html,
    });
    if (error) {
        throw new ErrorWithStatus("Failed to send reset email", 500);
    }
    return data;
};
export const resetPassword = async (email, token, newPassword) => {
    // Find user by token (this already validates email and expiry)
    const user = await User.findByResetToken(token);
    if (!user || user.email !== email) {
        throw new ErrorWithStatus("Invalid or expired password reset token", 400);
    }
    // Update password and clear reset fields
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    return;
};
//# sourceMappingURL=auth.service.js.map