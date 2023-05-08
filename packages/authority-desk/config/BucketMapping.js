export const BucketsMapping = ({ role = '', count_stats = {} }) => {
	const {
		ineligible,
		requested,
		eligible,
		released,
		approved,
		hold,
		delivered,
		surrendered,
		surrender_pending,
		release_pending,
	} = count_stats;

	const postApproved = +(delivered || 0)
		+ (approved || 0)
		+ (surrendered || 0)
		+ (surrender_pending || 0)
	+ (release_pending || 0);

	const buckets =		role === 'kam'
		? [
			{
				name  : 'ineligible',
				title : 'Not Eligible',
				count : ineligible,
			},
			{
				name  : 'requested',
				title : 'Special Requests',
				count : requested,
			},
			{ name: 'eligible', title: 'Eligible', count: eligible },
			{ name: 'approved', title: 'Approved', count: approved },
			{ name: 'released', title: 'Released', count: released },
			{ name: 'hold', title: 'Hold', count: hold },
		]
		: [
			{ name: 'eligible', title: 'Eligible', count: eligible },
			{
				name  : 'requested',
				title : 'Requested',
				count : requested,
			},
			{
				name  : 'ineligible',
				title : 'Not Eligible',
				count : ineligible,
			},
			{ name: 'approved', title: 'Approved', count: postApproved },
			{ name: 'released', title: 'Released', count: released },
			{ name: 'hold', title: 'Hold', count: hold },
		];

	const additionalTabs = [
		{
			name  : 'approved',
			title : 'Ready for Release',
		},
		{
			name  : 'release_pending',
			title : 'Pending for Release',
		},
		{
			name  : 'surrender_pending',
			title : 'Pending for Surrender',
		},
		{
			name  : 'surrendered',
			title : 'Surrendered',
		},
		{
			name  : 'delivered',
			title : 'Delivered',
		},
	];
	return {
		buckets, additionalTabs,
	};
};
