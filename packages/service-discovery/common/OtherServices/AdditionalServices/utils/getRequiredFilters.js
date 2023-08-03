const getRequiredFilters = ({ detail = {}, service, trade_type }) => {
	const FILTERS_MAPPING = {
		export_fcl_customs: {
			trade_type,
		},
		export_fcl_cfs: {
			trade_type,
		},
		export_fcl_freight_local: {
			trade_type,
		},
		fcl_freight: {
			trade_type,
		},
		import_fcl_freight_local: {
			trade_type,
		},
		import_fcl_cfs: {
			trade_type,
		},
		import_fcl_customs: {
			trade_type,
		},
	};

	return FILTERS_MAPPING[service] || {};
};
export default getRequiredFilters;
