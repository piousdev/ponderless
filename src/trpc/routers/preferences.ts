import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "../init";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const preferencesRouter = createTRPCRouter({
	getSidebarState: baseProcedure.query(async ({ ctx }) => {
		const sidebarCookie = ctx.cookies.get(SIDEBAR_COOKIE_NAME);
		const isOpen = sidebarCookie?.value !== "false";
		return { isOpen };
	}),

	setSidebarState: baseProcedure
		.input(z.object({ isOpen: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			ctx.cookies.set(SIDEBAR_COOKIE_NAME, input.isOpen.toString(), {
				maxAge: SIDEBAR_COOKIE_MAX_AGE,
				path: "/",
				sameSite: "lax",
			});
			return { success: true, isOpen: input.isOpen };
		}),
});