import mongoose, { Model } from "mongoose";
export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: "USER" | "ADMIN";
    resetPasswordToken?: string | null;
    resetPasswordExpires?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}
interface IUserMethods {
    createPasswordResetToken(): string;
}
interface IUserStatics {
    findByResetToken(token: string): Promise<(IUser & mongoose.Document) | null>;
}
type UserModel = Model<IUser, {}, IUserMethods> & IUserStatics;
export declare const User: UserModel;
export {};
//# sourceMappingURL=user.schema.d.ts.map