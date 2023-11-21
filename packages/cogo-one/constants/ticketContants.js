export const getRateShipmentServices = ({ t = () => {}, watchIdType = '' }) => {
	const options = [
		{
			label : t('myTickets:fcl'),
			value : 'fcl_freight',
		},
		{
			label : t('myTickets:lcl'),
			value : 'lcl_freight',
		},
		{
			label : t('myTickets:air'),
			value : 'air_freight',
		},
		{
			label : t('myTickets:ftl'),
			value : 'ftl_freight',
		},
		{
			label : t('myTickets:ltl'),
			value : 'ltl_freight',
		},
		{
			label : t('myTickets:fcl_customs'),
			value : 'fcl_customs',
		},
		{
			label : t('myTickets:lcl_customs'),
			value : 'lcl_customs',
		},
		{
			label : t('myTickets:fcl_cfs'),
			value : 'fcl_cfs',
		},
		{
			label : t('myTickets:trailer'),
			value : 'trailer_freight',
		},
		{
			label : t('myTickets:haulage'),
			value : 'haulage_freight',
		},
		{
			label : t('myTickets:air_customs'),
			value : 'air_customs',
		},
	];

	if (watchIdType === 'dislike_id') {
		return options?.filter((option) => option?.value !== 'fcl_cfs');
	}

	return options;
};

export const SERVICE_API_MAPPING = {
	missing_id: {
		fcl_freight     : 'list_fcl_freight_rate_requests',
		lcl_freight     : 'list_lcl_freight_rate_requests',
		air_freight     : 'list_air_freight_rate_requests',
		ftl_freight     : 'list_ftl_freight_rate_requests',
		ltl_freight     : 'list_ltl_freight_rate_requests',
		fcl_customs     : 'list_fcl_customs_rate_requests',
		lcl_customs     : 'list_lcl_customs_rate_requests',
		fcl_cfs         : 'list_fcl_cfs_rate_requests',
		trailer_freight : 'list_trailer_freight_rate_requests',
		haulage_freight : 'list_haulage_freight_rate_requests',
		air_customs     : 'list_air_customs_rate_requests',
	},
	dislike_id: {
		fcl_freight     : 'list_fcl_freight_rate_feedbacks',
		lcl_freight     : 'list_lcl_freight_rate_feedbacks',
		air_freight     : 'list_air_freight_rate_feedbacks',
		ftl_freight     : 'list_ftl_freight_rate_feedbacks',
		ltl_freight     : 'list_ltl_freight_rate_feedbacks',
		fcl_customs     : 'list_fcl_customs_rate_feedbacks',
		lcl_customs     : 'list_lcl_customs_rate_feedbacks',
		trailer_freight : 'list_trailer_freight_rate_feedbacks',
		haulage_freight : 'list_haulage_freight_rate_feedbacks',
		air_customs     : 'list_air_customs_rate_feedbacks',
		box             : 'list_air_freight_rate_feedbacks',
		crate           : 'list_air_freight_rate_feedbacks',
		pallet          : 'list_air_freight_rate_feedbacks',
		loose           : 'list_air_freight_rate_feedbacks',
	},
};
