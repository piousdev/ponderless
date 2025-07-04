import { z } from "zod";

export const signUpSchema = z
	.object({
		// Account Information
		email: z.string().email("Invalid email address"),
		username: z
			.string()
			.min(3, "Username must be at least 3 characters")
			.max(20, "Username must be less than 20 characters")
			.regex(
				/^[a-zA-Z0-9_]+$/,
				"Username can only contain letters, numbers, and underscores",
			),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/[0-9]/, "Password must contain at least one number")
			.regex(
				/[^a-zA-Z0-9]/,
				"Password must contain at least one special character",
			),
		confirmPassword: z.string(),

		// Personal Information
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
		dateOfBirth: z.date({
			required_error: "Date of birth is required",
		}),
		gender: z.enum(["male", "female", "other", "prefer-not-to-say"]),

		// Address Information
		country: z.string().min(1, "Country is required"),
		addressLine1: z.string().min(1, "Address is required"),
		addressLine2: z.string().optional(),
		city: z.string().min(1, "City is required"),
		state: z.string().min(1, "State/Province is required"),
		postalCode: z.string().min(1, "Postal code is required"),

		// Professional Information
		company: z.string().optional(),
		jobTitle: z.string().optional(),
		industry: z.string().optional(),

		// Profile Information
		bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
		website: z.string().url("Invalid URL").optional().or(z.literal("")),
		linkedin: z.string().optional(),
		twitter: z.string().optional(),
		github: z.string().optional(),

		// Preferences
		timezone: z.string().min(1, "Timezone is required"),
		language: z.string().min(1, "Language is required"),
		twoFactorAuth: z.boolean(),
		marketingEmails: z.boolean(),
		productUpdates: z.boolean(),

		// Legal
		termsAccepted: z.boolean().refine((val) => val === true, {
			message: "You must accept the terms and conditions",
		}),
		privacyAccepted: z.boolean().refine((val) => val === true, {
			message: "You must accept the privacy policy",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export const signInSchema = z.object({
	identifier: z
		.string()
		.min(1, "Username or email is required")
		.refine(
			(value) => {
				// Check if it's a valid email or a valid username
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				const usernameRegex = /^[a-zA-Z0-9_]+$/;

				return (
					emailRegex.test(value) ||
					(usernameRegex.test(value) && value.length >= 3)
				);
			},
			{
				message:
					"Please enter a valid email address or username (3+ characters, letters, numbers, and underscores only)",
			},
		),
	password: z.string().min(1, "Password is required"),
	rememberMe: z.boolean().optional(),
	oauthProviders: z.array(z.string()).optional(),
});
