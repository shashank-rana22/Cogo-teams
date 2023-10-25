const SHIPMENT_TYPE_OPTIONS = {
	fcl_freight: {
		label : 'FCL FREIGHT',
		value : 'fcl_freight',
	},
	lcl_freight:	{
		label : 'LCL FREIGHT',
		value : 'lcl_freight',
	},
	air_freight: {
		label : 'AIR FREIGHT',
		value : 'air_freight',
	},
	ftl_freight: {
		label : 'FTL FREIGHT',
		value : 'ftl_freight',
	},
	ltl_freight: {
		label : 'LTL FREIGHT',
		value : 'ltl_freight',
	},
	fcl_customs: {
		label : 'FCL CUSTOMS',
		value : 'fcl_customs',
	},
	lcl_customs: {
		label : 'LCL CUSTOMS',
		value : 'lcl_customs',
	},
	air_customs: {
		label : 'AIR CUSTOMS',
		value : 'air_customs',
	},
	fcl_cfs: {
		label : 'FCL CFS',
		value : 'fcl_cfs',
	},
	trailer_freight: {
		label : 'TRAILER FREIGHT',
		value : 'trailer_freight',
	},
	haulage_freight: {
		label : 'HAULAGE FREIGHT',
		value : 'haulage_freight',
	},
	fcl_freight_local: {
		label   : 'FCL LOCALS',
		value   : 'fcl_freight_local',
		hideFor : ['smtRateReverts'],
	},
	lcl_freight_local: {
		label   : 'LCL LOCALS',
		value   : 'lcl_freight_local',
		hideFor : ['smtRateReverts'],
	},
	air_freight_local: {
		label   : 'AIR LOCALS',
		value   : 'air_freight_local',
		hideFor : ['smtRateReverts'],
	},
	domestic_air_freight: {
		label   : 'DOMESTIC AIR',
		value   : 'domestic_air_freight',
		hideFor : ['smtRateReverts'],
	},
	rail_domestic_freight: {
		label   : 'RAIL DOMESTIC',
		value   : 'rail_domestic_freight',
		hideFor : ['smtRateReverts'],
	},
};

export default SHIPMENT_TYPE_OPTIONS;
