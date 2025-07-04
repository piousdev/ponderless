"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
	Check,
	ChevronsUpDown,
	Eye,
	EyeOff,
	Loader2,
	Upload,
	X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link.js";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/shadcn/ui/button";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn/ui/select";
import { Separator } from "@/components/shadcn/ui/separator";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { COUNTRIES } from "@/modules/auth/countries";
import { signUpSchema } from "@/modules/auth/schema";
import { getPopularTimezones } from "@/modules/auth/timezones";
import {
	createOAuthProviders,
	OAuthProviders,
} from "@/modules/auth/ui/components/oauth-providers";
import { PasswordStrength } from "@/modules/auth/ui/components/password-strength-indicator";

export default function SignUpView() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [currentStep, setCurrentStep] = useState(1);
	const profileUploadId = React.useId();

	// OAuth providers configuration
	const handleOAuthLogin = (providerId: string) => {
		console.log(`OAuth login with ${providerId}`);
		// Implement OAuth login logic here
	};

	const oauthProviders = createOAuthProviders(
		["google", "apple", "microsoft"], // You can customize which providers to show
		handleOAuthLogin,
	);

	const form = useForm({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
			firstName: "",
			lastName: "",
			phoneNumber: "",
			dateOfBirth: undefined,
			gender: "prefer-not-to-say",
			country: "",
			addressLine1: "",
			addressLine2: "",
			city: "",
			state: "",
			postalCode: "",
			company: "",
			jobTitle: "",
			industry: "",
			bio: "",
			website: "",
			linkedin: "",
			twitter: "",
			github: "",
			timezone: "UTC+00:00",
			language: "en",
			twoFactorAuth: false,
			marketingEmails: false,
			productUpdates: true,
			termsAccepted: false,
			privacyAccepted: false,
		},
	});

	const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));
			console.log("Form submitted:", data);
			alert("Account created successfully!");
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const nextStep = async () => {
		const fields = {
			1: ["email", "username", "password", "confirmPassword"],
			2: ["firstName", "lastName", "phoneNumber", "dateOfBirth", "gender"],
			3: ["country", "addressLine1", "city", "state", "postalCode"],
			4: ["timezone", "language"],
		};

		const fieldNames = fields[currentStep as keyof typeof fields];
		const isValid = await form.trigger(
			fieldNames as (keyof typeof form.getValues)[],
		);
		if (isValid) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		setCurrentStep(currentStep - 1);
	};

	const steps = [
		{ number: 1, title: "Account" },
		{ number: 2, title: "Personal" },
		{ number: 3, title: "Address" },
		{ number: 4, title: "Preferences" },
		{ number: 5, title: "Complete" },
	];

	return (
		<div className="max-w-2xl mx-auto">
			{/* Progress Steps */}
			<div className="mb-8">
				<div className="flex items-center justify-between">
					{steps.map((step, index) => (
						<React.Fragment key={step.number}>
							<div className="flex flex-col items-center">
								<div
									className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
										currentStep >= step.number
											? "bg-primary text-primary-foreground"
											: "bg-muted text-muted-foreground"
									}`}
								>
									{currentStep > step.number ? (
										<Check className="w-5 h-5" />
									) : (
										step.number
									)}
								</div>
								<span className="mt-2 text-xs font-medium">{step.title}</span>
							</div>
							{index < steps.length - 1 && (
								<div
									className={`flex-1 h-[2px] mx-2 transition-colors ${
										currentStep > step.number ? "bg-primary" : "bg-muted"
									}`}
								/>
							)}
						</React.Fragment>
					))}
				</div>
			</div>

			<div className="bg-card rounded-lg shadow-lg p-8">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-foreground">
						Create your account
					</h1>
					<p className="mt-2 text-muted-foreground">
						Join our community and unlock amazing features
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{currentStep === 1 && (
							<div className="space-y-6">
								{/* OAuth Login */}
								<OAuthProviders
									providers={oauthProviders}
									className="space-y-3"
								/>

								<div className="relative">
									<div className="absolute inset-0 flex items-center">
										<Separator />
									</div>
									<div className="relative flex justify-center text-xs uppercase">
										<span className="bg-background px-2 text-muted-foreground">
											Or continue with email
										</span>
									</div>
								</div>

								{/* Account Fields */}
								<FormField
									name="email"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="john.doe@example.com"
													{...field}
												/>
											</FormControl>
											<FormMessage>
												{form.formState.errors.email?.message}
											</FormMessage>
										</FormItem>
									)}
								/>

								<FormField
									name="username"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input placeholder="johndoe" {...field} />
											</FormControl>
											<FormDescription>
												This is how others will see you on the platform
											</FormDescription>
											<FormMessage>
												{form.formState.errors.username?.message}
											</FormMessage>
										</FormItem>
									)}
								/>

								<FormField
									name="password"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														type={showPassword ? "text" : "password"}
														placeholder="Create a strong password"
														{...field}
													/>
													<Button
														type="button"
														variant="ghost"
														size="icon"
														className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
														onClick={() => setShowPassword(!showPassword)}
													>
														{showPassword ? (
															<EyeOff className="h-4 w-4" />
														) : (
															<Eye className="h-4 w-4" />
														)}
													</Button>
												</div>
											</FormControl>
											<PasswordStrength password={field.value} />
											<FormMessage>
												{form.formState.errors.password?.message}
											</FormMessage>
										</FormItem>
									)}
								/>

								<FormField
									name="confirmPassword"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confirm Password</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														type={showConfirmPassword ? "text" : "password"}
														placeholder="Confirm your password"
														{...field}
													/>
													<Button
														type="button"
														variant="ghost"
														size="icon"
														className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
														onClick={() =>
															setShowConfirmPassword(!showConfirmPassword)
														}
													>
														{showConfirmPassword ? (
															<EyeOff className="h-4 w-4" />
														) : (
															<Eye className="h-4 w-4" />
														)}
													</Button>
												</div>
											</FormControl>
											<FormMessage>
												{form.formState.errors.confirmPassword?.message}
											</FormMessage>
										</FormItem>
									)}
								/>
							</div>
						)}

						{currentStep === 2 && (
							<div className="space-y-6">
								{/* Profile Picture */}
								<div className="flex flex-col items-center space-y-4">
									<div className="relative">
										<div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
											{profileImage ? (
												<Image
													src={profileImage}
													alt="Profile"
													className="object-cover"
													width={96}
													height={96}
												/>
											) : (
												<Upload className="w-8 h-8 text-muted-foreground" />
											)}
										</div>
										{profileImage && (
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-background border"
												onClick={() => setProfileImage(null)}
											>
												<X className="h-4 w-4" />
											</Button>
										)}
									</div>
									<div>
										<Input
											type="file"
											id={profileUploadId}
											className="hidden"
											accept="image/*"
											onChange={handleImageUpload}
										/>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() =>
												document.getElementById(profileUploadId)?.click()
											}
										>
											Upload Profile Picture
										</Button>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<FormField
										name="firstName"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>First Name</FormLabel>
												<FormControl>
													<Input placeholder="John" {...field} />
												</FormControl>
												<FormMessage>
													{form.formState.errors.firstName?.message}
												</FormMessage>
											</FormItem>
										)}
									/>

									<FormField
										name="lastName"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Name</FormLabel>
												<FormControl>
													<Input placeholder="Doe" {...field} />
												</FormControl>
												<FormMessage>
													{form.formState.errors.lastName?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
								</div>

								<FormField
									name="phoneNumber"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone Number</FormLabel>
											<FormControl>
												<Input
													type="tel"
													placeholder="+1 (555) 123-4567"
													{...field}
												/>
											</FormControl>
											<FormMessage>
												{form.formState.errors.phoneNumber?.message}
											</FormMessage>
										</FormItem>
									)}
								/>

								<FormField
									name="dateOfBirth"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Date of Birth</FormLabel>
											<FormControl>
												<Input
													type="date"
													{...field}
													value={
														field.value ? format(field.value, "yyyy-MM-dd") : ""
													}
													onChange={(e) =>
														field.onChange(
															e.target.value ? new Date(e.target.value) : null,
														)
													}
												/>
											</FormControl>
											<FormMessage>
												{form.formState.errors.dateOfBirth?.message}
											</FormMessage>
										</FormItem>
									)}
								/>

								<FormField
									name="gender"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Gender</FormLabel>
											<FormControl>
												<Select
													value={field.value}
													onValueChange={field.onChange}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select gender" />
														<ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="male">Male</SelectItem>
														<SelectItem value="female">Female</SelectItem>
														<SelectItem value="other">Other</SelectItem>
														<SelectItem value="prefer-not-to-say">
															Prefer not to say
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage>
												{form.formState.errors.gender?.message}
											</FormMessage>
										</FormItem>
									)}
								/>

								<FormField
									name="bio"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Bio (Optional)</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Tell us a bit about yourself..."
													className="resize-none"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{field.value?.length || 0}/500 characters
											</FormDescription>
											<FormMessage>
												{form.formState.errors.bio?.message}
											</FormMessage>
										</FormItem>
									)}
								/>
							</div>
						)}

						{currentStep === 3 && (
							<div className="space-y-6">
								<FormField
									name="country"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Country</FormLabel>
											<FormControl>
												<Select
													value={field.value}
													onValueChange={field.onChange}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select country" />
														<ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
													</SelectTrigger>
													<SelectContent>
														{COUNTRIES.map((country) => (
															<SelectItem
																key={country.code}
																value={country.code}
															>
																{country.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage>
												{form.formState.errors.country?.message}
											</FormMessage>
										</FormItem>
									)}
								/>

								<FormField
									name="addressLine1"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Address Line 1</FormLabel>
											<FormControl>
												<Input placeholder="123 Main Street" {...field} />
											</FormControl>
											<FormMessage>
												{form.formState.errors.addressLine1?.message}
											</FormMessage>
										</FormItem>
									)}
								/>

								<FormField
									name="addressLine2"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Address Line 2 (Optional)</FormLabel>
											<FormControl>
												<Input
													placeholder="Apartment, suite, etc."
													{...field}
												/>
											</FormControl>
											<FormMessage>
												{form.formState.errors.addressLine2?.message}
											</FormMessage>
										</FormItem>
									)}
								/>

								<div className="grid grid-cols-2 gap-4">
									<FormField
										name="city"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>City</FormLabel>
												<FormControl>
													<Input placeholder="San Francisco" {...field} />
												</FormControl>
												<FormMessage>
													{form.formState.errors.city?.message}
												</FormMessage>
											</FormItem>
										)}
									/>

									<FormField
										name="state"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>State/Province</FormLabel>
												<FormControl>
													<Input placeholder="CA" {...field} />
												</FormControl>
												<FormMessage>
													{form.formState.errors.state?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
								</div>

								<FormField
									name="postalCode"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Postal Code</FormLabel>
											<FormControl>
												<Input placeholder="94105" {...field} />
											</FormControl>
											<FormMessage>
												{form.formState.errors.postalCode?.message}
											</FormMessage>
										</FormItem>
									)}
								/>

								<Separator />

								<div className="space-y-4">
									<h3 className="text-lg font-medium">
										Professional Information (Optional)
									</h3>

									<FormField
										name="company"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Company/Organization</FormLabel>
												<FormControl>
													<Input placeholder="Acme Corp" {...field} />
												</FormControl>
												<FormMessage>
													{form.formState.errors.company?.message}
												</FormMessage>
											</FormItem>
										)}
									/>

									<FormField
										name="jobTitle"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Job Title</FormLabel>
												<FormControl>
													<Input placeholder="Software Engineer" {...field} />
												</FormControl>
												<FormMessage>
													{form.formState.errors.jobTitle?.message}
												</FormMessage>
											</FormItem>
										)}
									/>

									<FormField
										name="industry"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Industry</FormLabel>
												<FormControl>
													<Input placeholder="Technology" {...field} />
												</FormControl>
												<FormMessage>
													{form.formState.errors.industry?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
								</div>
							</div>
						)}

						{currentStep === 4 && (
							<div className="space-y-6">
								<FormField
									name="timezone"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Timezone</FormLabel>
											<FormControl>
												<Select
													value={field.value}
													onValueChange={field.onChange}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select timezone" />
														<ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
													</SelectTrigger>
													<SelectContent>
														{getPopularTimezones().map((tz) => (
															<SelectItem key={tz.id} value={tz.id}>
																{tz.name} ({tz.offset})
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage>
												{form.formState.errors.timezone?.message}
											</FormMessage>
										</FormItem>
									)}
								/>

								<FormField
									name="language"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Preferred Language</FormLabel>
											<FormControl>
												<Select
													value={field.value}
													onValueChange={field.onChange}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select language" />
														<ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
													</SelectTrigger>
													<SelectContent>
														{Array.from(
															new Set(
																COUNTRIES.map((country) => country.language),
															),
														)
															.sort()
															.map((lang) => (
																<SelectItem key={lang} value={lang}>
																	{lang}
																</SelectItem>
															))}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage>
												{form.formState.errors.language?.message}
											</FormMessage>
										</FormItem>
									)}
								/>

								<Separator />

								<div className="space-y-4">
									<h3 className="text-lg font-medium">
										Social Media (Optional)
									</h3>

									<FormField
										name="website"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Website</FormLabel>
												<FormControl>
													<Input
														type="url"
														placeholder="https://example.com"
														{...field}
													/>
												</FormControl>
												<FormMessage>
													{form.formState.errors.website?.message}
												</FormMessage>
											</FormItem>
										)}
									/>

									<FormField
										name="linkedin"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>LinkedIn</FormLabel>
												<FormControl>
													<Input
														placeholder="linkedin.com/in/johndoe"
														{...field}
													/>
												</FormControl>
												<FormMessage>
													{form.formState.errors.linkedin?.message}
												</FormMessage>
											</FormItem>
										)}
									/>

									<FormField
										name="twitter"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Twitter/X</FormLabel>
												<FormControl>
													<Input placeholder="@johndoe" {...field} />
												</FormControl>
												<FormMessage>
													{form.formState.errors.twitter?.message}
												</FormMessage>
											</FormItem>
										)}
									/>

									<FormField
										name="github"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>GitHub</FormLabel>
												<FormControl>
													<Input placeholder="github.com/johndoe" {...field} />
												</FormControl>
												<FormMessage>
													{form.formState.errors.github?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
								</div>

								<Separator />

								<div className="space-y-4">
									<h3 className="text-lg font-medium">
										Security & Preferences
									</h3>

									<FormField
										name="twoFactorAuth"
										control={form.control}
										render={({ field }) => (
											<FormItem className="flex items-center justify-between rounded-lg border p-4">
												<div className="space-y-0.5">
													<FormLabel className="text-base">
														Two-Factor Authentication
													</FormLabel>
													<FormDescription>
														Add an extra layer of security to your account
													</FormDescription>
												</div>
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										name="marketingEmails"
										control={form.control}
										render={({ field }) => (
											<FormItem className="flex items-center justify-between rounded-lg border p-4">
												<div className="space-y-0.5">
													<FormLabel className="text-base">
														Marketing Emails
													</FormLabel>
													<FormDescription>
														Receive emails about new features and offers
													</FormDescription>
												</div>
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										name="productUpdates"
										control={form.control}
										render={({ field }) => (
											<FormItem className="flex items-center justify-between rounded-lg border p-4">
												<div className="space-y-0.5">
													<FormLabel className="text-base">
														Product Updates
													</FormLabel>
													<FormDescription>
														Get notified about important product updates
													</FormDescription>
												</div>
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
							</div>
						)}

						{currentStep === 5 && (
							<div className="space-y-6">
								<div className="text-center space-y-4">
									<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
										<Check className="w-8 h-8 text-primary" />
									</div>
									<h2 className="text-2xl font-semibold">Almost there!</h2>
									<p className="text-muted-foreground">
										Please review and accept our terms to complete your
										registration
									</p>
								</div>

								<Separator />

								<div className="space-y-4">
									<FormField
										name="termsAccepted"
										control={form.control}
										render={({ field }) => (
											<FormItem className="flex flex-row items-start space-x-3 space-y-0">
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
												<div className="space-y-1 leading-none">
													<FormLabel>
														I accept the{" "}
														<Link
															href="/terms"
															className="text-primary underline"
														>
															Terms and Conditions
														</Link>
													</FormLabel>
													<FormDescription>
														By creating an account, you agree to our Terms of
														Service
													</FormDescription>
													<FormMessage>
														{form.formState.errors.termsAccepted?.message}
													</FormMessage>
												</div>
											</FormItem>
										)}
									/>

									<FormField
										name="privacyAccepted"
										control={form.control}
										render={({ field }) => (
											<FormItem className="flex flex-row items-start space-x-3 space-y-0">
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
												<div className="space-y-1 leading-none">
													<FormLabel>
														I accept the{" "}
														<Link
															href="/privacy"
															className="text-primary underline"
														>
															Privacy Policy
														</Link>
													</FormLabel>
													<FormDescription>
														We care about your privacy and data security
													</FormDescription>
													<FormMessage>
														{form.formState.errors.privacyAccepted?.message}
													</FormMessage>
												</div>
											</FormItem>
										)}
									/>
								</div>
							</div>
						)}

						<div className="flex justify-between pt-6">
							{currentStep > 1 && (
								<Button
									type="button"
									variant="outline"
									onClick={prevStep}
									disabled={isLoading}
								>
									Previous
								</Button>
							)}

							{currentStep < 5 ? (
								<Button
									type="button"
									onClick={nextStep}
									className={currentStep === 1 ? "w-full" : "ml-auto"}
								>
									Next
								</Button>
							) : (
								<Button
									type="button"
									onClick={form.handleSubmit(onSubmit)}
									disabled={isLoading}
									className="ml-auto"
								>
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Creating account...
										</>
									) : (
										"Create Account"
									)}
								</Button>
							)}
						</div>
					</form>
				</Form>

				{currentStep === 1 && (
					<p className="mt-6 text-center text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link
							href="/signin"
							className="font-medium text-primary hover:text-primary/80"
						>
							Sign in
						</Link>
					</p>
				)}
			</div>
		</div>
	);
}
