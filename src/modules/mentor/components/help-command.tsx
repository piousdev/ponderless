"use client";

import type { DialogProps } from "@radix-ui/react-dialog";
import { CornerDownLeftIcon, SearchIcon } from "lucide-react";
import * as React from "react";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/shadcn/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Separator } from "@/components/shadcn/ui/separator";
import { useIsMac } from "@/hooks/use-is-mac";
import { useMutationObserver } from "@/hooks/use-mutation-observer";
import { cn } from "@/lib/utils";
import { type Event, trackEvent } from "@/lib/utils/event";

export function copyToClipboardWithMeta(value: string, event?: Event) {
	navigator.clipboard.writeText(value);
	if (event) {
		trackEvent(event);
	}
}

export default function HelpCommandMenu({
	className,
	...props
}: DialogProps & { className?: string }) {
	const isMac = useIsMac();
	const [open, setOpen] = React.useState(false);
	const [selectedType, setSelectedType] = React.useState<
		"color" | "page" | "component" | "block" | null
	>(null);
	const [copyPayload, setCopyPayload] = React.useState("");

	const runCommand = React.useCallback((command: () => unknown) => {
		setOpen(false);
		command();
	}, []);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
				if (
					(e.target instanceof HTMLElement && e.target.isContentEditable) ||
					e.target instanceof HTMLInputElement ||
					e.target instanceof HTMLTextAreaElement ||
					e.target instanceof HTMLSelectElement
				) {
					return;
				}

				e.preventDefault();
				setOpen((open) => !open);
			}

			if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
				runCommand(() => {
					if (selectedType === "color") {
						copyToClipboardWithMeta(copyPayload, {
							name: "copy_color",
							properties: { color: copyPayload },
						});
					}

					if (selectedType === "block") {
						copyToClipboardWithMeta(copyPayload, {
							name: "copy_npm_command",
							properties: { command: copyPayload },
						});
					}

					if (selectedType === "page" || selectedType === "component") {
						copyToClipboardWithMeta(copyPayload, {
							name: "copy_npm_command",
							properties: { command: copyPayload },
						});
					}
				});
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [copyPayload, runCommand, selectedType]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button
					className={cn(
						"bg-background border border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground relative h-10 w-full flex items-center justify-start px-3 font-normal shadow-sm rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					)}
					onClick={() => setOpen(true)}
					{...props}
				>
					<SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
					<span className="hidden lg:inline-flex">
						Search help (e.g., upgrade membership, add more mentors, etc.) ...
					</span>
					<span className="inline-flex lg:hidden">Search help...</span>
					<div className="absolute top-2 right-2 hidden gap-1 sm:flex">
						<CommandMenuKbd>{isMac ? "⌘" : "Ctrl"}</CommandMenuKbd>
						<CommandMenuKbd className="aspect-square">K</CommandMenuKbd>
					</div>
				</button>
			</DialogTrigger>
			<DialogContent
				showCloseButton={false}
				className="rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800"
			>
				<DialogHeader className="sr-only">
					<DialogTitle>Search documentation...</DialogTitle>
					<DialogDescription>Search for a command to run...</DialogDescription>
				</DialogHeader>
				<Command className="**:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input-wrapper]:border-input rounded-none bg-transparent **:data-[slot=command-input]:!h-9 **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:!h-9 **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border">
					<CommandInput placeholder="Search documentation..." />
					<CommandList className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
						<CommandEmpty className="text-muted-foreground py-12 text-center text-sm">
							No results found.
						</CommandEmpty>
					</CommandList>
				</Command>
				<div className="text-muted-foreground absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium dark:border-t-neutral-700 dark:bg-neutral-800">
					<div className="flex items-center gap-2">
						<CommandMenuKbd>
							<CornerDownLeftIcon />
						</CommandMenuKbd>{" "}
						{selectedType === "page" || selectedType === "component"
							? "Go to Page"
							: null}
						{selectedType === "color" ? "Copy OKLCH" : null}
					</div>
					{copyPayload && (
						<>
							<Separator orientation="vertical" className="!h-4" />
							<div className="flex items-center gap-1">
								<CommandMenuKbd>{isMac ? "⌘" : "Ctrl"}</CommandMenuKbd>
								<CommandMenuKbd>C</CommandMenuKbd>
								{copyPayload}
							</div>
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}

function CommandMenuItem({
	children,
	className,
	onHighlight,
	...props
}: React.ComponentProps<typeof CommandItem> & {
	onHighlight?: () => void;
	"data-selected"?: string;
	"aria-selected"?: string;
}) {
	const ref = React.useRef<HTMLDivElement>(null);

	useMutationObserver(ref, (mutations) => {
		mutations.forEach((mutation) => {
			if (
				mutation.type === "attributes" &&
				mutation.attributeName === "aria-selected" &&
				ref.current?.getAttribute("aria-selected") === "true"
			) {
				onHighlight?.();
			}
		});
	});

	return (
		<CommandItem
			ref={ref}
			className={cn(
				"data-[selected=true]:border-input data-[selected=true]:bg-input/50 h-9 rounded-md border border-transparent !px-3 font-medium",
				className,
			)}
			{...props}
		>
			{children}
		</CommandItem>
	);
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
	return (
		<kbd
			className={cn(
				"bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3",
				className,
			)}
			{...props}
		/>
	);
}
