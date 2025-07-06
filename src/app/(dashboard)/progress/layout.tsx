import type { ReactNode } from "react";
import ProgressHubLayoutWrapper from "@/modules/progress-hub/components/progress-hub-layout-wrapper";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return <ProgressHubLayoutWrapper>{children}</ProgressHubLayoutWrapper>;
}
