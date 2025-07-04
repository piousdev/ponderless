"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export function ThemeProvider({ children }: Props): ReactNode {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			storageKey="skyl-web-solutions-theme"
			themes={["light", "dark", "system"]}
		>
			{children}
		</NextThemesProvider>
	);
}
