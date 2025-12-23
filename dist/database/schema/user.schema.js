import mongoose from "mongoose";
import crypto from "crypto";
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false,
    },
    role: {
        type: String,
        enum: {
            values: ["USER", "ADMIN"],
            message: "{VALUE} is not a valid role",
        },
        default: "USER",
    },
    resetPasswordToken: {
        type: String,
        default: null,
        select: false,
    },
    resetPasswordExpires: {
        type: Date,
        default: null,
        select: false,
    },
}, {
    timestamps: true,
});
// Indexes
userSchema.index({ email: 1 });
// Instance method
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpires = new Date(Date.now() + 3600000);
    return resetToken;
};
// Static method
userSchema.statics.findByResetToken = function (token) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    return this.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpires +password");
};
export const User = mongoose.model("Users", userSchema);
//# sourceMappingURL=user.schema.js.map