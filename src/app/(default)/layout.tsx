"use client";

import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		AOS.init({
			once: true,
			disable: "phone",
			duration: 700,
			easing: "ease-out-cubic",
		});
	});

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(56px+0.5rem)] md:pt-[calc(56px+1.5rem)]">
				{children}
			</main>
			<Footer border={true} />
		</div>
	);
}
