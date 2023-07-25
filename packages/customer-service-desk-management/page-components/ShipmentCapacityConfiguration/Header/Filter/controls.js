const controls = ({ t = () => {}, translationKey }) => [
	{
		name: 'payment_term',
		label: t(`${translationKey}_85`),
		items: [
			{
				key: 'prepaid',
				children: t(`${translationKey}_86`),
			},
			{
				key: 'collect',
				children: t(`${translationKey}_87`),
			},
		],
		type: 'chips',
		size: 'md',
	},
	{
		name: 'schedule_type',
		label: t(`${translationKey}_88`),
		type: 'chips',
		items: [
			{
				key: 'direct',
				children: t(`${translationKey}_89`),
			},
			{
				key: 'transhipment',
				children: t(`${translationKey}_90`),
			},
		],
	},
	{
		label: t(`${translationKey}_91`),
		type: 'daterangepicker',
		name: 'departure',
	},
	{
		label: t(`${translationKey}_92`),
		type: 'daterangepicker',
		name: 'arrival',
	},
];

export default controls;
