const getServiceTypeTranslatedMapping = ({ t = () => {} }) => ({
	ocean: [
		{
			label : t('allocation:ocean_fcl'),
			value : 'fcl_freight',
		},
		{
			label : t('allocation:ocean_lcl'),
			value : 'lcl_freight',
		},
	],
	air: [
		{
			label : t('allocation:air_international'),
			value : 'air_freight', // 'air_international'
		},
		{
			label : t('allocation:domestic_air_freight'),
			value : 'domestic_air_freight',
		},
	],
	surface: [
		{
			label : t('allocation:surface_ftl'),
			value : 'ftl_freight',
		},
		{
			label : t('allocation:surface_ltl'),
			value : 'ltl_freight',
		},
	],
	haulage: [
		{
			label : t('allocation:haulage_trailer'),
			value : 'trailer_freight',
		},
		{
			label : t('allocation:haulage_rail_freight'),
			value : 'rail_freight', // 'haulage_freight',
		},
		{
			label : t('allocation:haulage_barge'),
			value : 'barge_freight',
		},
	],
	rail: [],
});

const getServiceTypeOptions = ({ watchShipmentMode, t = () => {} }) => {
	const serviceTypeMappingOptions = getServiceTypeTranslatedMapping({ t });

	return serviceTypeMappingOptions[watchShipmentMode] || [];
};

export default getServiceTypeOptions;
