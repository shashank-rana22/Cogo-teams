const service = [
	'lcl_freight',
	'fcl_freight',
	'air_freight',
	'lcl_customs',
	'fcl_customs',
	'air_customs',
	'ltl_freight',
	'ftl_freight',
	'trailer_freight',
	'haulage_freight',
];

const ageing_bucket = [
	'amount_not_due',
	'amount_1_30',
	'amount_31_60',
	'amount_61_90',
	'amount_91_180',
	'amount_181_365',
	'amount_365',
	'on_account_amount',
];

const account_type = [
	'Rail',
	'others',
	'FTL',
	'Air',
	'Enterprise',
	'LTL',
	'Longtail',
	'CP',
	'Overseas CP',
	'SME',
];

export const barChartKeys = {
	101 : ['101'],
	301 : ['301'],
	201 : ['201'],
	401 : ['401'],
	service,
	ageing_bucket,
	account_type,
};
