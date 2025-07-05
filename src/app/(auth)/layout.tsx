import Logo from "@/components/logo";
import { ThemeToggleButton } from "@/components/theme-toggle";

interface ILayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
	return (
		<>
			<header className="absolute z-30 w-full">
				<div className="mx-auto max-w-6xl px-4 sm:px-6">
					<div className="flex h-16 items-center justify-between md:h-20">
						{/* Site branding */}
						<div className="mr-4 shrink-0">
							<Logo />
						</div>
						<div>
							<ThemeToggleButton />
						</div>
					</div>
				</div>
			</header>
			<main className="grow pt-16 md:pt-20">
				<div className="container mx-auto">{children}</div>
			</main>
		</>
	);
};

export default Layout;
