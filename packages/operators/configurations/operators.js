export const operators = (t = () => {}) => ({
	common_first: [
		{
			key   : 'logo',
			label : t('operators:operators_common_first_logo'),
			span  : 2,
			func  : 'handleLogo',
		},
		{
			key   : 'short_name',
			label : t('operators:operators_common_first_name'),
			span  : 2,
			func  : 'startCase',
		},
	],
	airline: [
		{
			key   : 'iata_code',
			label : t('operators:operators_airline_iata_code'),
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'airway_bill_prefix',
			label : t('operators:operators_airline_airway_bill_prefix'),
			span  : 2,
			func  : 'startCase',
		},
	],
	others: [
		{
			key   : 'operator_type',
			label : t('operators:operators_others_operator_type'),
			span  : 1.5,
			func  : 'startCase',
		},
	],
	common_second: [
		{
			key   : 'status',
			label : t('operators:operators_common_second_status'),
			span  : 1.5,
			func  : 'handleStatus',
		},
		{
			key   : 'edit',
			label : '',
			span  : 1,
			func  : 'handleEdit',
		},
	],
});
