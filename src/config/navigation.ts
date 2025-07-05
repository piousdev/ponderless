type NavigationId = string & { readonly __brand: "NavigationId" };
type TrackingId = string & { readonly __brand: "TrackingId" };
type NavigationSection = "primary" | "secondary";
type NavigationTarget = "_self" | "_blank";
type UserRole = "authenticated" | "admin" | "guest";
type IconName =
  | "home"
  | "info-circle"
  | "dashboard"
  | "chart-line"
  | "robot"
  | "bell"
  | "envelope"
  | "sign-in"
  | "user-plus"
  | "moon"
  | "sun"
  | "user-circle"
  | "user"
  | "cog"
  | "sign-out";

interface INavigationItem {
  readonly id: NavigationId;
  readonly title: string;
  readonly hrefOrExternalUrl?: string | null | undefined;
  readonly icon?: IconName;
  readonly children?: ReadonlyArray<INavigationItem>;
  readonly external?: boolean | null | undefined;
  readonly target?: NavigationTarget | null | undefined;
  readonly exact?: boolean | null | undefined;
  readonly matchPath?:
    | Readonly<RegExp>
    | ReadonlyArray<string>
    | null
    | undefined;
  readonly disabled?: boolean | null | undefined;
  readonly hidden?: boolean | null | undefined;
  readonly badge?: number | string | null | undefined;
  readonly isNew?: boolean | null | undefined;
  readonly description?: string | null | undefined;
  readonly ariaLabel?: string | null | undefined;
  readonly roles?: ReadonlyArray<UserRole> | null | undefined;
  readonly featureFlag?: string | null | undefined;
  readonly order?: number | null | undefined;
  readonly section?: NavigationSection | null | undefined;
  readonly trackingId?: TrackingId | null | undefined;
  readonly onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  readonly hotkey?: string | null | undefined;
  readonly meta?: Readonly<Record<string, unknown>> | null | undefined;
}

type PublicNavigationItem = Omit<INavigationItem, "roles">;
type AuthenticatedNavigationItem = INavigationItem & {
  readonly roles: ReadonlyArray<Extract<UserRole, "authenticated" | "admin">>;
};

function isAuthenticatedItem(
  item: INavigationItem,
): item is AuthenticatedNavigationItem {
  return (
    item.roles !== undefined && item.roles !== null && item.roles.length > 0
  );
}

function createNavigationId(id: string): NavigationId {
  return id as NavigationId;
}

function createTrackingId(id: string): TrackingId {
  return id as TrackingId;
}

const primaryNavItems: ReadonlyArray<INavigationItem> = [
  {
    id: createNavigationId("nav-home"),
    title: "Home",
    hrefOrExternalUrl: "/",
    icon: "home" as const,
    exact: true,
    order: 1,
    section: "primary" as const,
    trackingId: createTrackingId("nav_home"),
    ariaLabel: "Navigate to home page",
    hotkey: "h",
  },
  {
    id: createNavigationId("nav-pricing"),
    title: "Pricing",
    hrefOrExternalUrl: "/pricing",
    order: 2,
    section: "primary" as const,
    trackingId: createTrackingId("nav_pricing"),
    ariaLabel: "View your pricing",
    description: "View and edit your pricing information",
    hotkey: "p",
    meta: {
      hideWhenAuthenticated: true,
    },
  },
  {
    id: createNavigationId("nav-dashboard"),
    title: "Dashboard",
    hrefOrExternalUrl: "/dashboard",
    icon: "dashboard" as const,
    order: 3,
    section: "primary" as const,
    roles: ["authenticated"] as const,
    trackingId: createTrackingId("nav_dashboard"),
    ariaLabel: "Access your personal dashboard",
    description: "View your personalized dashboard and analytics",
    hotkey: "d",
    meta: {
      hideWhenAuthenticated: true,
    },
  },
  {
    id: createNavigationId("nav-diagnostic"),
    title: "Diagnostic",
    hrefOrExternalUrl: "/diagnostic",
    icon: "chart-line" as const,
    order: 4,
    section: "primary" as const,
    roles: ["authenticated"] as const,
    trackingId: createTrackingId("nav_diagnostic"),
    ariaLabel: "Run diagnostic tools",
    description: "Access diagnostic tools and assessments",
    isNew: true,
    meta: {
      hideWhenAuthenticated: true,
    },
  },
  {
    id: createNavigationId("nav-ai-mentor"),
    title: "Mentor",
    hrefOrExternalUrl: "/mentor",
    icon: "robot" as const,
    order: 5,
    section: "primary" as const,
    roles: ["authenticated"] as const,
    trackingId: createTrackingId("nav_ai_mentor"),
    ariaLabel: "Access AI mentoring features",
    description: "Get personalized AI-powered mentoring",
    badge: "Beta",
    isNew: true,
  },
  {
    id: createNavigationId("nav-changelog"),
    title: "Changelog",
    hrefOrExternalUrl: "/changelog",
    icon: "bell" as const,
    order: 6,
    section: "primary" as const,
    trackingId: createTrackingId("nav_changelog"),
    ariaLabel: "View latest changelog",
    badge: 3,
  },
  {
    id: createNavigationId("nav-feedback"),
    title: "Feedback",
    hrefOrExternalUrl: "/feedback",
    icon: "envelope" as const,
    order: 7,
    section: "primary" as const,
    trackingId: createTrackingId("nav_feedback"),
    ariaLabel: "Provide feedback to us",
    description: "Share your thoughts and suggestions with us",
    isNew: true,
  },
] as const satisfies ReadonlyArray<INavigationItem>;

const secondaryNavItems: ReadonlyArray<INavigationItem> = [
  {
    id: createNavigationId("nav-login"),
    title: "Login",
    hrefOrExternalUrl: "/signin",
    icon: "sign-in" as const,
    order: 1,
    section: "secondary" as const,
    trackingId: createTrackingId("nav_login"),
    ariaLabel: "Login to your account",
    meta: {
      hideWhenAuthenticated: true,
      variant: "primary" as const,
    },
  },
] as const satisfies ReadonlyArray<INavigationItem>;

type NavigationStructure = {
  readonly primary: ReadonlyArray<INavigationItem>;
  readonly secondary: ReadonlyArray<INavigationItem>;
};

const navigationStructure: NavigationStructure = {
  primary: primaryNavItems,
  secondary: secondaryNavItems,
} as const;

function filterNavigationByRole(
  items: ReadonlyArray<INavigationItem>,
  userRoles: ReadonlyArray<UserRole> = ["guest"],
): ReadonlyArray<INavigationItem> {
  return items.filter((item): boolean => {
    // Check if item should be hidden when authenticated
    if (
      item.meta?.hideWhenAuthenticated &&
      userRoles.includes("authenticated")
    ) {
      return false;
    }

    // Check role-based filtering
    if (!item.roles || item.roles.length === 0) {
      return true;
    }

    return item.roles.some((role): boolean => userRoles.includes(role));
  });
}

function createNavigationItem<T extends Partial<INavigationItem>>(
  overrides: T & Pick<INavigationItem, "id" | "title" | "hrefOrExternalUrl">,
): INavigationItem {
  return {
    section: "primary" as const,
    trackingId: overrides.id as unknown as TrackingId,
    ...overrides,
  } as INavigationItem;
}

function getNavigationItemById(
  items: ReadonlyArray<INavigationItem>,
  id: NavigationId,
): INavigationItem | undefined {
  return items.find((item): boolean => item.id === id);
}

function hasChildren(item: INavigationItem): item is INavigationItem & {
  readonly children: NonNullable<INavigationItem["children"]>;
} {
  return Array.isArray(item.children) && item.children.length > 0;
}

const memoizedFilterByRole = (() => {
  const cache = new Map<string, ReadonlyArray<INavigationItem>>();

  return (
    items: ReadonlyArray<INavigationItem>,
    userRoles: ReadonlyArray<UserRole> = ["guest"],
  ): ReadonlyArray<INavigationItem> => {
    const cacheKey = `${items.length}-${userRoles.join(",")}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as ReadonlyArray<INavigationItem>;
    }

    const filtered = filterNavigationByRole(items, userRoles);
    cache.set(cacheKey, filtered);

    return filtered;
  };
})();

type NavigationContext = {
  readonly items: ReadonlyArray<INavigationItem>;
  readonly userRoles: ReadonlyArray<UserRole>;
  readonly activeId: NavigationId | null;
};

export {
  primaryNavItems,
  secondaryNavItems,
  navigationStructure,
  filterNavigationByRole,
  memoizedFilterByRole,
  createNavigationItem,
  createNavigationId,
  createTrackingId,
  getNavigationItemById,
  hasChildren,
  isAuthenticatedItem,
  type INavigationItem,
  type NavigationId,
  type TrackingId,
  type UserRole,
  type NavigationSection,
  type NavigationStructure,
  type NavigationContext,
  type PublicNavigationItem,
  type AuthenticatedNavigationItem,
};
