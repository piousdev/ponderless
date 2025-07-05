import { sql } from "drizzle-orm";
import {
	bigint,
	boolean,
	index,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	primaryKey,
	real,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

// Enums (only for stable/fixed values)
export const subscriptionPlanEnum = pgEnum("subscription_plan", [
	"free",
	"hobby",
	"basic",
	"business",
	"enterprise",
]);
export const subscriptionStatusEnum = pgEnum("subscription_status", [
	"active",
	"inactive",
	"cancelled",
	"expired",
	"trial",
	"pending",
]);
export const lessonStatusEnum = pgEnum("lesson_status", [
	"locked",
	"in_progress",
	"unlocked",
	"completed",
]);
export const lessonTypeEnum = pgEnum("lesson_type", [
	"test",
	"mission",
	"mixed",
	"practice",
]);
export const activityTypeEnum = pgEnum("activity_type", [
	"test_item",
	"mission",
	"practice",
]);
export const skillTrackEnum = pgEnum("skill_track", ["decision", "critical"]);
export const challengeStatusEnum = pgEnum("challenge_status", [
	"not_started",
	"in_progress",
	"completed",
]);
export const rewardSourceEnum = pgEnum("reward_source", [
	"test_complete",
	"mission_win",
	"challenge",
]);
export const notificationTypeEnum = pgEnum("notification_type", [
	"streak_reminder",
	"daily_goal",
	"achievement",
	"challenge_start",
	"friend_activity",
	"system",
]);
export const notificationStatusEnum = pgEnum("notification_status", [
	"pending",
	"sent",
	"read",
	"dismissed",
	"failed",
]);
export const friendshipStatusEnum = pgEnum("friendship_status", [
	"pending",
	"accepted",
	"blocked",
	"deleted",
]);
export const achievementTypeEnum = pgEnum("achievement_type", [
	"streak",
	"skill_mastery",
	"test_performance",
	"daily_goal",
	"weekly_goal",
	"social",
	"system",
]);
export const goalTypeEnum = pgEnum("goal_type", [
	"daily_xp",
	"weekly_xp",
	"daily_lessons",
	"weekly_lessons",
	"skill_practice",
]);
export const goalStatusEnum = pgEnum("goal_status", [
	"active",
	"completed",
	"failed",
	"paused",
]);
export const placementStatusEnum = pgEnum("placement_status", [
	"not_started",
	"in_progress",
	"completed",
]);
export const onboardingStepEnum = pgEnum("onboarding_step", [
	"welcome",
	"goals",
	"placement_test",
	"first_lesson",
	"completed",
]);

// 1. Account & Identity
export const users = pgTable(
	"users",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		email: text("email").unique(),
		passwordHash: text("password_hash"),
		displayName: text("display_name"),
		locale: varchar("locale", { length: 10 }),
		tzOffset: integer("tz_offset"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		lastLogin: timestamp("last_login"),
	},
	(table) => [
		uniqueIndex("users_email_idx").on(table.email),
		index("users_last_login_idx").on(table.lastLogin),
	],
);

export const authProviders = pgTable(
	"auth_providers",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		provider: text("provider").notNull(),
		providerUserId: text("provider_user_id").notNull(),
		encryptedToken: text("encrypted_token"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		uniqueIndex("auth_providers_provider_user_idx")
			.on(table.provider, table.providerUserId)
			.where(sql`provider = 'email'`),
	],
);

export const subscriptions = pgTable(
	"subscriptions",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		plan: subscriptionPlanEnum("plan").notNull(),
		status: subscriptionStatusEnum("status").notNull(),
		startedAt: timestamp("started_at").notNull(),
		endsAt: timestamp("ends_at"),
		externalRef: text("external_ref"),
	},
	(table) => [
		index("subscriptions_status_idx").on(table.status),
		uniqueIndex("subscriptions_user_active_idx")
			.on(table.userId, table.status)
			.where(sql`status = 'active'`),
	],
);

// 2. Pedagogical Tree
export const courses = pgTable(
	"courses",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		slug: text("slug").notNull().unique(),
		title: text("title").notNull(),
		description: text("description"),
		displayOrder: integer("display_order").notNull(),
		isPublished: boolean("is_published").default(false).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		uniqueIndex("courses_slug_idx").on(table.slug),
		index("courses_display_order_idx").on(table.displayOrder),
	],
);

export const units = pgTable(
	"units",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		courseId: uuid("course_id")
			.notNull()
			.references(() => courses.id, { onDelete: "cascade" }),
		title: text("title").notNull(),
		summary: text("summary"),
		displayOrder: integer("display_order").notNull(),
	},
	(table) => [
		uniqueIndex("units_course_order_idx")
			.on(table.courseId, table.displayOrder)
			.where(sql`course_id IS NOT NULL`),
	],
);

export const skills = pgTable(
	"skills",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull().unique(),
		track: skillTrackEnum("track").notNull(),
		description: text("description"),
	},
	(table) => [uniqueIndex("skills_name_idx").on(table.name)],
);

export const lessons = pgTable(
	"lessons",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		unitId: uuid("unit_id")
			.notNull()
			.references(() => units.id, { onDelete: "cascade" }),
		title: text("title").notNull(),
		skillId: uuid("skill_id").references(() => skills.id),
		difficulty: integer("difficulty").notNull(),
		lessonType: lessonTypeEnum("lesson_type").notNull(),
		displayOrder: integer("display_order").notNull(),
	},
	(table) => [
		uniqueIndex("lessons_unit_order_idx")
			.on(table.unitId, table.displayOrder)
			.where(sql`unit_id IS NOT NULL`),
		index("lessons_skill_idx").on(table.skillId),
	],
);

export const lessonItems = pgTable(
	"lesson_items",
	{
		lessonId: uuid("lesson_id")
			.notNull()
			.references(() => lessons.id, { onDelete: "cascade" }),
		activityId: uuid("activity_id").notNull(),
		activityType: activityTypeEnum("activity_type").notNull(),
	},
	(table) => [
		primaryKey({
			columns: [table.lessonId, table.activityId, table.activityType],
		}),
	],
);

export const userLessonProgress = pgTable(
	"user_lesson_progress",
	{
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		lessonId: uuid("lesson_id")
			.notNull()
			.references(() => lessons.id, { onDelete: "cascade" }),
		status: lessonStatusEnum("status").notNull().default("locked"),
		stars: integer("stars").notNull().default(0),
		lastPlayedAt: timestamp("last_played_at"),
	},
	(table) => [
		primaryKey({ columns: [table.userId, table.lessonId] }),
		index("user_lesson_progress_completed_idx")
			.on(table.status)
			.where(sql`status = 'completed'`),
	],
);

// 4. Assessment Engine
export const tests = pgTable(
	"tests",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull(),
		version: text("version").notNull(),
		description: text("description"),
		scoringScript: text("scoring_script"),
		licenseType: text("license_type"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		uniqueIndex("tests_name_version_idx").on(table.name, table.version),
	],
);

export const testItems = pgTable(
	"test_items",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		testId: uuid("test_id")
			.notNull()
			.references(() => tests.id, { onDelete: "cascade" }),
		prompt: text("prompt").notNull(),
		itemType: text("item_type").notNull(),
		correctAnswer: text("correct_answer"),
		metadata: jsonb("metadata"),
		orderIndex: integer("order_index").notNull(),
	},
	(table) => [
		uniqueIndex("test_items_test_order_idx").on(table.testId, table.orderIndex),
		index("test_items_test_idx").on(table.testId),
	],
);

export const testInstances = pgTable(
	"test_instances",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		testId: uuid("test_id")
			.notNull()
			.references(() => tests.id),
		startedAt: timestamp("started_at").notNull(),
		completedAt: timestamp("completed_at"),
		totalScore: real("total_score"),
		percentile: real("percentile"),
	},
	(table) => [
		index("test_instances_user_completed_idx").on(
			table.userId,
			table.completedAt.desc(),
		),
	],
);

export const itemResponses = pgTable(
	"item_responses",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		testInstanceId: uuid("test_instance_id")
			.notNull()
			.references(() => testInstances.id, { onDelete: "cascade" }),
		testItemId: uuid("test_item_id")
			.notNull()
			.references(() => testItems.id),
		responseValue: text("response_value"),
		responseTimeMs: integer("response_time_ms"),
	},
	(table) => [index("item_responses_instance_idx").on(table.testInstanceId)],
);

export const subscores = pgTable(
	"subscores",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		testInstanceId: uuid("test_instance_id")
			.notNull()
			.references(() => testInstances.id, { onDelete: "cascade" }),
		skillId: uuid("skill_id")
			.notNull()
			.references(() => skills.id),
		rawScore: real("raw_score").notNull(),
		percentile: real("percentile"),
	},
	(table) => [
		index("subscores_instance_skill_idx").on(
			table.testInstanceId,
			table.skillId,
		),
	],
);

export const userSkillScores = pgTable(
	"user_skill_scores",
	{
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		skillId: uuid("skill_id")
			.notNull()
			.references(() => skills.id),
		rollingPercentile: real("rolling_percentile").notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => [
		primaryKey({ columns: [table.userId, table.skillId] }),
		index("user_skill_scores_percentile_idx").on(table.rollingPercentile),
	],
);

// 5. Practice Missions
export const missions = pgTable(
	"missions",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		title: text("title").notNull(),
		content: jsonb("content").notNull(),
		skillId: uuid("skill_id").references(() => skills.id),
		difficulty: integer("difficulty").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("missions_skill_difficulty_idx").on(table.skillId, table.difficulty),
	],
);

export const missionInstances = pgTable(
	"mission_instances",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		missionId: uuid("mission_id")
			.notNull()
			.references(() => missions.id),
		startedAt: timestamp("started_at").notNull(),
		completedAt: timestamp("completed_at"),
		outcome: jsonb("outcome"),
	},
	(table) => [
		index("mission_instances_user_completed_idx").on(
			table.userId,
			table.completedAt.desc(),
		),
	],
);

// 6. Challenges
export const challenges = pgTable(
	"challenges",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		title: text("title").notNull(),
		description: text("description"),
		skillId: uuid("skill_id").references(() => skills.id),
		startAt: timestamp("start_at").notNull(),
		endAt: timestamp("end_at").notNull(),
		rewardXp: integer("reward_xp").notNull(),
	},
	(table) => [
		index("challenges_date_range_idx").on(table.startAt, table.endAt),
	],
);

export const challengeOptions = pgTable(
	"challenge_options",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		challengeId: uuid("challenge_id")
			.notNull()
			.references(() => challenges.id, { onDelete: "cascade" }),
		optionText: text("option_text").notNull(),
		isCorrect: boolean("is_correct").notNull().default(false),
	},
	(table) => [index("challenge_options_challenge_idx").on(table.challengeId)],
);

export const challengeProgress = pgTable(
	"challenge_progress",
	{
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		challengeId: uuid("challenge_id")
			.notNull()
			.references(() => challenges.id, { onDelete: "cascade" }),
		status: challengeStatusEnum("status").notNull().default("not_started"),
		progressData: jsonb("progress_data"),
		lastUpdated: timestamp("last_updated").defaultNow().notNull(),
	},
	(table) => [
		primaryKey({ columns: [table.userId, table.challengeId] }),
		index("challenge_progress_status_idx").on(table.status),
	],
);

// 7. Gamification & Meta-progress
export const rewardLedger = pgTable(
	"reward_ledger",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		deltaXp: integer("delta_xp").notNull(),
		source: rewardSourceEnum("source").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [index("reward_ledger_user_idx").on(table.userId)],
);

export const userProgress = pgTable("user_progress", {
	userId: uuid("user_id")
		.primaryKey()
		.references(() => users.id, { onDelete: "cascade" }),
	totalXp: bigint("total_xp", { mode: "number" }).notNull().default(0),
	currentStreak: integer("current_streak").notNull().default(0),
	heartsLeft: integer("hearts_left").notNull().default(5),
	lastActivityAt: timestamp("last_activity_at"),
});

// Legacy tables (kept for compatibility)
export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 8. Notifications & Reminders
export const notificationPreferences = pgTable("notification_preferences", {
	userId: uuid("user_id")
		.primaryKey()
		.references(() => users.id, { onDelete: "cascade" }),
	streakReminders: boolean("streak_reminders").default(true).notNull(),
	dailyGoalReminders: boolean("daily_goal_reminders").default(true).notNull(),
	achievementNotifications: boolean("achievement_notifications")
		.default(true)
		.notNull(),
	socialNotifications: boolean("social_notifications").default(true).notNull(),
	reminderTime: varchar("reminder_time", { length: 5 }).default("19:00"), // HH:MM format
	timezone: varchar("timezone", { length: 50 }),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const notifications = pgTable(
	"notifications",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: notificationTypeEnum("type").notNull(),
		title: text("title").notNull(),
		message: text("message").notNull(),
		status: notificationStatusEnum("status").default("pending").notNull(),
		metadata: jsonb("metadata"),
		scheduledFor: timestamp("scheduled_for"),
		sentAt: timestamp("sent_at"),
		readAt: timestamp("read_at"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("notifications_user_status_idx").on(table.userId, table.status),
		index("notifications_scheduled_idx").on(table.scheduledFor),
	],
);

// 9. Social Features
export const friendships = pgTable(
	"friendships",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		requesterUserId: uuid("requester_user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		addresseeUserId: uuid("addressee_user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		status: friendshipStatusEnum("status").default("pending").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => [
		index("friendships_requester_idx").on(table.requesterUserId),
		index("friendships_addressee_idx").on(table.addresseeUserId),
		index("friendships_status_idx").on(table.status),
	],
);

export const leaderboards = pgTable(
	"leaderboards",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull(),
		description: text("description"),
		type: text("type").notNull(), // 'weekly_xp', 'monthly_xp', 'skill_specific'
		skillId: uuid("skill_id").references(() => skills.id),
		startDate: timestamp("start_date").notNull(),
		endDate: timestamp("end_date"),
		isActive: boolean("is_active").default(true).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("leaderboards_type_idx").on(table.type),
		index("leaderboards_active_idx").on(table.isActive),
	],
);

export const leaderboardEntries = pgTable(
	"leaderboard_entries",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		leaderboardId: uuid("leaderboard_id")
			.notNull()
			.references(() => leaderboards.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		score: bigint("score", { mode: "number" }).notNull(),
		rank: integer("rank").notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => [
		index("leaderboard_entries_rank_idx").on(table.leaderboardId, table.rank),
		index("leaderboard_entries_user_idx").on(table.userId),
	],
);

// 10. Achievements & Badges
export const achievements = pgTable(
	"achievements",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull().unique(),
		description: text("description").notNull(),
		type: achievementTypeEnum("type").notNull(),
		iconUrl: text("icon_url"),
		criteria: jsonb("criteria").notNull(), // JSON defining achievement criteria
		xpReward: integer("xp_reward").default(0).notNull(),
		isActive: boolean("is_active").default(true).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		uniqueIndex("achievements_name_idx").on(table.name),
		index("achievements_type_idx").on(table.type),
	],
);

export const userAchievements = pgTable(
	"user_achievements",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		achievementId: uuid("achievement_id")
			.notNull()
			.references(() => achievements.id, { onDelete: "cascade" }),
		progress: integer("progress").default(0).notNull(),
		maxProgress: integer("max_progress").notNull(),
		isCompleted: boolean("is_completed").default(false).notNull(),
		completedAt: timestamp("completed_at"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("user_achievements_user_idx").on(table.userId),
		index("user_achievements_user_completed_idx").on(
			table.userId,
			table.isCompleted,
		),
		index("user_achievements_achievement_idx").on(table.achievementId),
	],
);

// 11. Goals & Streaks
export const goals = pgTable(
	"goals",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: goalTypeEnum("type").notNull(),
		targetValue: integer("target_value").notNull(),
		currentValue: integer("current_value").default(0).notNull(),
		status: goalStatusEnum("status").default("active").notNull(),
		startDate: timestamp("start_date").notNull(),
		endDate: timestamp("end_date").notNull(),
		completedAt: timestamp("completed_at"),
		metadata: jsonb("metadata"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("goals_user_status_idx").on(table.userId, table.status),
		index("goals_type_idx").on(table.type),
		index("goals_date_range_idx").on(table.startDate, table.endDate),
	],
);

export const streakHistory = pgTable(
	"streak_history",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		streakStart: timestamp("streak_start").notNull(),
		streakEnd: timestamp("streak_end"),
		streakLength: integer("streak_length").notNull(),
		isActive: boolean("is_active").default(true).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("streak_history_user_idx").on(table.userId),
		index("streak_history_active_idx").on(table.isActive),
	],
);

export const dailyActivity = pgTable(
	"daily_activity",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		date: timestamp("date").notNull(),
		xpEarned: integer("xp_earned").default(0).notNull(),
		lessonsCompleted: integer("lessons_completed").default(0).notNull(),
		testsCompleted: integer("tests_completed").default(0).notNull(),
		missionsCompleted: integer("missions_completed").default(0).notNull(),
		timeSpentMinutes: integer("time_spent_minutes").default(0).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		uniqueIndex("daily_activity_user_date_idx").on(table.userId, table.date),
		index("daily_activity_date_idx").on(table.date),
	],
);

// 12. Content Versioning
export const contentVersions = pgTable(
	"content_versions",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		contentType: text("content_type").notNull(), // 'lesson', 'test', 'mission'
		contentId: uuid("content_id").notNull(),
		version: integer("version").notNull(),
		changes: jsonb("changes"),
		createdBy: uuid("created_by").references(() => users.id),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("content_versions_content_idx").on(
			table.contentType,
			table.contentId,
		),
		index("content_versions_version_idx").on(table.version),
	],
);

export const abTests = pgTable(
	"ab_tests",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull().unique(),
		description: text("description"),
		startDate: timestamp("start_date").notNull(),
		endDate: timestamp("end_date"),
		isActive: boolean("is_active").default(true).notNull(),
		variants: jsonb("variants").notNull(), // JSON array of variants
		trafficAllocation: jsonb("traffic_allocation").notNull(), // % allocation per variant
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		uniqueIndex("ab_tests_name_idx").on(table.name),
		index("ab_tests_active_idx").on(table.isActive),
	],
);

export const userAbTestAssignments = pgTable(
	"user_ab_test_assignments",
	{
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		abTestId: uuid("ab_test_id")
			.notNull()
			.references(() => abTests.id, { onDelete: "cascade" }),
		variant: text("variant").notNull(),
		assignedAt: timestamp("assigned_at").defaultNow().notNull(),
	},
	(table) => [
		primaryKey({ columns: [table.userId, table.abTestId] }),
		index("user_ab_test_assignments_test_idx").on(table.abTestId),
	],
);

// 13. Analytics & Learning Paths
export const learningPaths = pgTable(
	"learning_paths",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		recommendedLessons: jsonb("recommended_lessons").notNull(),
		difficulty: integer("difficulty").notNull(),
		skillFocus: jsonb("skill_focus"), // Areas user should focus on
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [index("learning_paths_user_idx").on(table.userId)],
);

export const userAnalytics = pgTable(
	"user_analytics",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		date: timestamp("date").notNull(),
		avgResponseTime: real("avg_response_time"), // in seconds
		accuracyRate: real("accuracy_rate"), // 0-1
		skillPerformance: jsonb("skill_performance"), // performance per skill
		strugglingAreas: jsonb("struggling_areas"),
		strengths: jsonb("strengths"),
		recommendedActions: jsonb("recommended_actions"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		uniqueIndex("user_analytics_user_date_idx").on(table.userId, table.date),
		index("user_analytics_date_idx").on(table.date),
	],
);

// 14. Onboarding & Placement
export const onboardingProgress = pgTable("onboarding_progress", {
	userId: uuid("user_id")
		.primaryKey()
		.references(() => users.id, { onDelete: "cascade" }),
	currentStep: onboardingStepEnum("current_step").default("welcome").notNull(),
	stepsCompleted: jsonb("steps_completed").default("[]").notNull(),
	personalizedGoals: jsonb("personalized_goals"),
	completedAt: timestamp("completed_at"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const placementTests = pgTable(
	"placement_tests",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		skillId: uuid("skill_id")
			.notNull()
			.references(() => skills.id),
		status: placementStatusEnum("status").default("not_started").notNull(),
		startedAt: timestamp("started_at"),
		completedAt: timestamp("completed_at"),
		initialLevel: integer("initial_level"),
		finalLevel: integer("final_level"),
		responses: jsonb("responses"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("placement_tests_user_idx").on(table.userId),
		index("placement_tests_skill_idx").on(table.skillId),
		index("placement_tests_status_idx").on(table.status),
	],
);

// 15. Offline Support
export const offlineContent = pgTable(
	"offline_content",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		contentType: text("content_type").notNull(), // 'lesson', 'test', 'mission'
		contentId: uuid("content_id").notNull(),
		downloadedAt: timestamp("downloaded_at").defaultNow().notNull(),
		lastAccessedAt: timestamp("last_accessed_at"),
		isAvailable: boolean("is_available").default(true).notNull(),
		fileSize: bigint("file_size", { mode: "number" }),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("offline_content_user_idx").on(table.userId),
		index("offline_content_content_idx").on(table.contentType, table.contentId),
		index("offline_content_available_idx").on(table.isAvailable),
	],
);

export const offlineProgress = pgTable(
	"offline_progress",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		contentType: text("content_type").notNull(),
		contentId: uuid("content_id").notNull(),
		progressData: jsonb("progress_data").notNull(),
		isSynced: boolean("is_synced").default(false).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		syncedAt: timestamp("synced_at"),
	},
	(table) => [
		index("offline_progress_user_idx").on(table.userId),
		index("offline_progress_synced_idx").on(table.isSynced),
	],
);
