/**
 * Demo Mode Detection
 * Enables fully self-contained demo mode with no backend dependency
 */

/**
 * Check if the application is running in demo mode
 * Demo mode is enabled via NEXT_PUBLIC_DEMO_MODE=true
 */
export function isDemoMode(): boolean {
	return process.env.NEXT_PUBLIC_DEMO_MODE === "true";
}

/**
 * Check if an action is allowed in demo mode
 * Destructive actions are blocked
 */
export function isActionAllowed(action: string): boolean {
	if (!isDemoMode()) return true;

	// Block destructive actions in demo mode
	const blockedActions = [
		"create",
		"delete",
		"update",
		"cancel",
		"start",
		"stop",
		"generate",
	];

	return !blockedActions.some((blocked) =>
		action.toLowerCase().includes(blocked),
	);
}

/**
 * Get demo action tooltip
 */
export function getDemoTooltip(): string {
	return "Demo Mode – Read Only";
}
