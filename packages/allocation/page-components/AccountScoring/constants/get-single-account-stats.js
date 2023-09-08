const getSingleAccountStats = ({ t = () => {} }) => [
	{
		detail_key   : 'kam_details',
		detail_label : t('allocation:kam_details'),
		stats        : [
			{
				key   : 'stakeholder_name',
				label : t('allocation:kam'),
				flex  : 1.5,
			},
			{
				key   : 'manager_name',
				label : t('allocation:manager'),
				flex  : 1.5,
			},
			{
				key   : 'role',
				label : t('allocation:role'),
				flex  : 1.5,
			},
			{
				key   : 'last_booking_day',
				label : t('allocation:last_transaction'),
				flex  : 1,
			},
		],
	},
	{
		detail_key   : 'organisation_details',
		detail_label : t('allocation:organisation_details'),
		stats        : [
			{
				key   : 'allocated_at',
				label : t('allocation:allocated_at_single_entity_label'),
				flex  : 1,
			},
			{
				key   : 'segment',
				label : t('allocation:segment_single_entity_label'),
				flex  : 1,
			},
			{
				key   : 'business_name',
				label : t('allocation:business_name'),
				flex  : 2.5,
			},
			{
				key   : 'user_name',
				label : t('allocation:user_name_single_entity_label'),
				flex  : 1.5,
			},
			{
				key   : 'warmth',
				label : t('allocation:warmth'),
				flex  : 1,
			},
		],
	},

];

export default getSingleAccountStats;
