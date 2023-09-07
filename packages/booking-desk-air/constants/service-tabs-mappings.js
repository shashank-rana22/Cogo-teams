const getServiceWiseMappings = (t = () => {}) => [
	{
		name  : 'air_freight',
		title : t('airBookingDesk:service_title_air_international'),
	},
	{
		name  : 'air_customs',
		title : t('airBookingDesk:service_title_air_customs'),
	},
	{
		name  : 'air_freight_local',
		title : t('airBookingDesk:service_title_air_local'),
	},
	{
		name  : 'domestic_air_freight',
		title : t('airBookingDesk:service_title_air_domestic'),
	},
];
export default getServiceWiseMappings;
