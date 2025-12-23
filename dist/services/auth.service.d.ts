import type { SignupDto } from "../types/index.js";
import { type IUser } from "../database/schema/user.schema.js";
export declare const login: (email: string, password: string) => Promise<string>;
export declare const register: ({ first_name, last_name, email, password, role, }: SignupDto) => Promise<IUser>;
export declare const forgotPassword: (email: string, resetUrl: string) => Promise<import("resend").CreateEmailResponseSuccess | null>;
export declare const resetPassword: (email: string, token: string, newPassword: string) => Promise<void>;
//# sourceMappingURL=auth.service.d.ts.map