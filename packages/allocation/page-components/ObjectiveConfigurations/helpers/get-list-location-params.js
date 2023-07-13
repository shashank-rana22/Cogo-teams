const PARAMS_SHIPMENT_TYPE_MAPPING = {
	fcl_freight: {
		filters: {
			status : 'active',
			type   : ['seaport', 'country'],
		},
		includes: {
			city                    : true,
			country                 : true,
			default_params_required : true,
		},
		preferences: {
			service_type: 'fcl_freight',
		},
	},
	lcl_freight: {
		filters: {
			status : 'active',
			type   : ['seaport', 'country'],
		},
		includes: {
			city                    : true,
			country                 : true,
			default_params_required : true,
		},
		preferences: {
			service_type: 'lcl_freight',
		},
	},
	air_international: {
		filters: {
			status : 'active',
			type   : ['airport', 'country', 'city'],
		},
		includes: {
			city                    : true,
			country                 : true,
			default_params_required : true,
		},
		preferences: {
			service_type: 'air_freight',
		},
	},
	air_domestic: {
		filters: {
			status : 'active',
			type   : ['airport', 'country', 'city'],
		},
		includes: {
			city                    : true,
			country                 : true,
			default_params_required : true,
		},
		preferences: {
			service_type: 'air_freight',
		},
	},
	trailer_freight: {
		filters: {
			status : 'active',
			type   : ['airport', 'seaport', 'city', 'pincode'],
		},
		includes: {
			city                    : true,
			country                 : true,
			default_params_required : true,
		},
		preferences: {
			service_type: 'trailer_freight',
		},
	},
	haulage_freight: {
		filters: {
			status : 'active',
			type   : ['seaport', 'country', 'city'],
		},
		includes: {
			city                    : true,
			country                 : true,
			default_params_required : true,
		},
		preferences: {
			service_type: 'haulage_freight',
		},
	},
	barge_freight: {
		filters: {
			status : 'active',
			type   : ['riverport', 'seaport', 'city', 'pincode'],
		},
		includes: {
			city                    : true,
			country                 : true,
			default_params_required : true,
		},
		preferences: {
			service_type: 'barge_freight',
		},
	},
	ftl_freight: {
		filters: {
			status : 'active',
			type   : ['seaport', 'airport', 'pincode', 'warehouse', 'railway_terminal'],
		},
		includes: {
			city                    : true,
			country                 : true,
			default_params_required : true,
		},
		preferences: {
			service_type: 'ftl_freight',
		},
	},
	ltl_freight: {
		filters: {
			status : 'active',
			type   : ['seaport', 'airport', 'pincode', 'warehouse', 'railway_terminal'],
		},
		includes: {
			city                    : true,
			country                 : true,
			default_params_required : true,
		},
		preferences: {
			service_type: 'ltl_freight',
		},
	},
	rail_domestic: {
		filters: {
			status : 'active',
			type   : ['railway_terminal'],
		},
		includes: {
			city                    : true,
			country                 : true,
			default_params_required : true,
		},
	},
};

const DEFAULT_PARAMS = {
	filters: {
		status : 'active',
		type   : ['country', 'city', 'seaport', 'airport', 'pincode', 'warehouse', 'railway_terminal'],
	},
	includes: {
		city                    : true,
		country                 : true,
		default_params_required : true,
	},
};

const getListLocationParams = (props) => {
	const { watchShipmentMode, watchServiceType } = props;

	return PARAMS_SHIPMENT_TYPE_MAPPING[watchServiceType]
    || PARAMS_SHIPMENT_TYPE_MAPPING[watchShipmentMode] || DEFAULT_PARAMS;
};

export default getListLocationParams;
