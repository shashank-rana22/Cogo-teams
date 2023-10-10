const commonOptionsForInternationalServices = [
	{
		label : 'Import',
		value : 'import',
	},
	{
		label : 'Export',
		value : 'export',
	},
];

const commonOptionsForDomesticServices = [
	{
		label : 'Import',
		value : 'import',
	},
	{
		label : 'Export',
		value : 'export',
	},
	{
		label : 'Domestic',
		value : 'domestic',
	},
];

const SERVICE_TRADE_TYPE_OPTION_MAPPING = {
	fcl_freight           : commonOptionsForInternationalServices,
	lcl_freight           : commonOptionsForInternationalServices,
	air_freight           : commonOptionsForDomesticServices,
	ftl_freight           : commonOptionsForDomesticServices,
	ltl_freight           : commonOptionsForDomesticServices,
	trailer_freight       : commonOptionsForDomesticServices,
	haulage_freight       : commonOptionsForDomesticServices,
	fcl_customs           : commonOptionsForInternationalServices,
	lcl_customs           : commonOptionsForInternationalServices,
	air_customs           : commonOptionsForInternationalServices,
	rail_domestic_freight : [{ label: 'Domestic', value: 'domestic' }],
};

export default SERVICE_TRADE_TYPE_OPTION_MAPPING;
