const getControls = ({ t = () => {} }) => [
	{
		expertise_type : 'customer_expertise',
		value          : [
			{
				threshold_score_type : 'score',
				id                   : 'customer_expertise',
				rules                : {
					required: t('allocation:score_is_required'),
				},
			},
		],
	},
	{
		expertise_type : 'trade_expertise',
		value          : [
			{
				threshold_score_type : 'score',
				id                   : 'trade_expertise',
				rules                : {
					required: t('allocation:score_is_required'),
				},
			},
		],
	},
	{
		expertise_type : 'commodity_expertise',
		value          : [
			{
				threshold_score_type : 'score',
				id                   : 'commodity_expertise',
				rules                : {
					required: t('allocation:score_is_required'),
				},
			},
		],
	},
	{
		expertise_type : 'misc_expertise',
		value          : [
			{
				threshold_score_type : 'score',
				id                   : 'misc_expertise',
				rules                : {
					required: t('allocation:score_is_required'),
				},
			},
		],
	},
	{
		expertise_type : 'transacting_accounts',
		value          : [
			{
				threshold_score_type : 'retained_account_min_duration',
				id                   : 'retained_account_min_duration',
				rules                : {
					required: t('allocation:score_is_required'),
				},
			},
			{
				threshold_score_type : 'retained_account_count',
				id                   : 'retained_account_count',
				rules                : {
					required: t('allocation:score_is_required'),
				},
			},
			{
				threshold_score_type : 'minimum_transacting_accounts',
				id                   : 'minimum_transacting_accounts',
				rules                : {
					required: t('allocation:score_is_required'),
				},
			},
		],
	},

];

export default getControls;
