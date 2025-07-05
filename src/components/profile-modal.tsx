"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/shadcn/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/shadcn/ui/dialog";
import { Label } from "@/components/shadcn/ui/label";
import { Separator } from "@/components/shadcn/ui/separator";

interface ProfileModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	user: {
		id: string;
		email: string;
		name?: string | null;
		image?: string | null;
		createdAt?: Date;
	};
}

export function ProfileModal({ open, onOpenChange, user }: ProfileModalProps) {
	const getInitials = (name?: string | null, email?: string) => {
		if (name) {
			const parts = name.split(" ");
			if (parts.length >= 2) {
				return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
			}
			return name.substring(0, 2).toUpperCase();
		}
		if (email) {
			return email.substring(0, 2).toUpperCase();
		}
		return "U";
	};

	const formatDate = (date?: Date) => {
		if (!date) return "N/A";
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>User Profile</DialogTitle>
					<DialogDescription>
						View your account information and profile details.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-6 py-4">
					<div className="flex items-center justify-center">
						<Avatar className="h-24 w-24">
							<AvatarImage
								src={user.image || undefined}
								alt={user.name || user.email}
							/>
							<AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
								{getInitials(user.name, user.email)}
							</AvatarFallback>
						</Avatar>
					</div>

					<Separator />

					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label className="text-sm text-muted-foreground">Name</Label>
							<p className="text-sm font-medium">
								{user.name || "Not provided"}
							</p>
						</div>

						<div className="grid gap-2">
							<Label className="text-sm text-muted-foreground">Email</Label>
							<p className="text-sm font-medium">{user.email}</p>
						</div>

						<div className="grid gap-2">
							<Label className="text-sm text-muted-foreground">User ID</Label>
							<p className="text-sm font-medium font-mono text-xs">{user.id}</p>
						</div>

						<div className="grid gap-2">
							<Label className="text-sm text-muted-foreground">
								Member Since
							</Label>
							<p className="text-sm font-medium">
								{formatDate(user.createdAt)}
							</p>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
