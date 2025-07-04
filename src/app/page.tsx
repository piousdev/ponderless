import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ClientGreeting } from "@/components/client-greeting";
import { SignUpForm } from "@/components/signup-form";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export default async function Home() {
	// Prefetch data on the server
	await prefetch(trpc.hello.queryOptions({ text: "world" }));

	return (
		<HydrateClient>
			<div>Home Page Greetings</div>
			<ErrorBoundary fallback={<div>Something went wrong</div>}>
				<Suspense fallback={<div>Loading...</div>}>
					<div>
						<div>
							<ClientGreeting />
						</div>
						<SignUpForm />
					</div>
				</Suspense>
			</ErrorBoundary>
		</HydrateClient>
	);
}
