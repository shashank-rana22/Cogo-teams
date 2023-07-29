import { IcMSearchlight } from '@cogoport/icons-react';

export const LOCATIONS_PROPS = {
	asyncKey    : 'list_locations',
	initialCall : false,
	placeholder : 'Port / Country',
	prefix      : <IcMSearchlight style={{
		width  : ' 24px',
		height : '16px',
	}}
	/>,
	size        : 'sm',
	isClearable : true,
};
export const MAIN_PORT_PROPS = {
	asyncKey    : 'list_locations_mapping',
	initialCall : true,
	placeholder : 'Main port',
	size        : 'sm',
	isClearable : true,
};
export const TYPE_MAPPING = { seaport: 'port', airport: 'airport' };

export const getLocationParams = (service_type = 'fcl') => ({
	filters: {
		type: [
			`${service_type === 'fcl' ? 'seaport' : 'airport'}`,
			'country',
		],
	},
	includes: {
		region_id               : true,
		continent_id            : true,
		country_id              : true,
		default_params_required : true,
	},
});
