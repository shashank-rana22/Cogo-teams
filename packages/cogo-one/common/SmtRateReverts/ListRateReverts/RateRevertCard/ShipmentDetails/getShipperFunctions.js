const SHOW_LOGO_FOR = ['fcl_freight', 'lcl_freight', 'air_freight'];

export function getShippingData({ cardData = {} }) {
	const { airline = {}, shipping_line = {}, service_type = '' } = cardData || {};

	const {
		short_name = '',
		business_name = '',
		logo_url = '',
	} = (service_type.includes('air') ? airline : shipping_line) || {};

	return {
		showLogo  : SHOW_LOGO_FOR.includes(service_type),
		logoUrl   : logo_url,
		belowText : short_name || business_name,
	};
}
