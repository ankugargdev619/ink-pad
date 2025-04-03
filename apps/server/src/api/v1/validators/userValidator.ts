import { z } from "zod";

const VALIDATIONS = {
    validPassword: z.string({
        required_error: "This is a required field",
        invalid_type_error: "Must be a string"
    })
        .min(5, "Must be atleast 5 characters long")
        .regex(/[A-Z]/, "Must contain atleast one uppercase letter")
        .regex(/[a-z]/, "Must contain atleast one lowercase letter")
        .regex(/\d/, "Must contain atleast one number")
        .regex(/[!@#$%^&*]/, "Must contain at least one special character [!@#$%^&*]"),
    validEmail: z.string({
        required_error: "Email is required",
        invalid_type_error: "Must be a string"
    }).email("Provide a valid email address"),
    validName: z.string({
        required_error: "This is required field",
        invalid_type_error: "Must be a string"
    }).min(2, "Must have atleast 2 characters"),
    validColorTheme: z.enum(["LIGHT", "DARK", "SYSTEM"]),
    validFontTheme: z.enum(["INTER", "NOTO", "SOURCE"]),
    validOtp: z.string({
        required_error: "This is required field",
        invalid_type_error: "Must be a string"
    }).length(6)
}


const registerSchema = z.object({
    firstName: VALIDATIONS.validName,
    lastName: VALIDATIONS.validName,
    email: VALIDATIONS.validEmail,
    password: VALIDATIONS.validPassword
}).strict();

const authenticateSchema = z.object({
    email: VALIDATIONS.validEmail,
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    })
}).strict();

const profileSchema = z.object({
    firstName: VALIDATIONS.validName.optional(),
    lastName: VALIDATIONS.validName.optional(),
    profile: z.string({ invalid_type_error: "profileUrl must be a string" }).optional(),
    colorTheme: VALIDATIONS.validColorTheme.optional(),
    fontTheme: VALIDATIONS.validFontTheme.optional()
}).strict();

const resetPassSchema = z.object({
    email: VALIDATIONS.validEmail
}).strict();

const updatePasswordSchema = z.object({
    email: VALIDATIONS.validEmail,
    password: VALIDATIONS.validPassword
}).strict();

const generateOtpSchema = z.object({
    email: VALIDATIONS.validEmail
})

const verifyOtpSchema = z.object({
    email: VALIDATIONS.validEmail,
    otp: VALIDATIONS.validOtp
})

export {
    registerSchema,
    authenticateSchema,
    profileSchema,
    resetPassSchema,
    updatePasswordSchema,
    generateOtpSchema,
    verifyOtpSchema
}