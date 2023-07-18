export const DUMMY_DATA = [
	[
		{ action_type: 'checkout', rates_count: 1200, drop: 71, parent: 'checkout' },
		{ action_type: 'booking_confirm', rates_count: 900, drop: 71, parent: 'checkout' },
		{ action_type: 'revenue_desk', rates_count: 540, drop: 71, parent: 'checkout' },
		{ action_type: 'so1', rates_count: 520, drop: 71, parent: 'checkout' },
	],
	[
		{ action_type: 'missing_rates', rates_count: 4323, drop: 71, parent: 'missing' },
		{ action_type: 'rates_triggered', rates_count: 1200, drop: 71, parent: 'missing' },
		{ action_type: 'rates_updated', rates_count: 540, drop: 71, parent: 'missing' },
	],
	[
		{ action_type: 'disliked_rates', rates_count: 1200, drop: 71, parent: 'dislike' },
		{ action_type: 'feedback_received', rates_count: 900, drop: 71, parent: 'dislike' },
		{ action_type: 'rates_reverted', rates_count: 540, drop: 71, parent: 'dislike' },
	],
	[
		{ action_type: 'dropoff_rates', rates_count: 1200, drop: 71, parent: 'dropoff' },
	],
];
