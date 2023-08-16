import { IcMLocation } from '@cogoport/icons-react';

import MODES from '../../page-components/ServiceDiscovery/SpotSearch/configurations/modes.json';
import CustomSelectOption from '../CustomSelectOption';

function LocationPrefix() { return (<IcMLocation fontSize={16} />); }
function LocationLabel(option) {
	return (
		<>
			{ CustomSelectOption({ data: option, key: 'locations' }) }
		</>
	);
}

const LOCATION_PARAMS = {
	page_limit               : 20,
	filters                  : { status: 'active' },
	recommendations          : true,
	pagination_data_required : false,
	fields                   : ['country', 'display_name', 'type', 'is_icd', 'postal_code', 'name', 'port_code'],
};

const getControls = (controls, service) => {
	let locationTypeFilter = [];

	MODES.forEach((modeItem) => {
		if (modeItem.value === service) locationTypeFilter = modeItem.type;
	});

	const newControls = controls.map((routeItem) => {
		const newRouteItem = { ...routeItem };

		if (routeItem.asyncKey && ['list_locations', 'list_locations_v2'].includes(routeItem.asyncKey)) {
			newRouteItem.prefix = LocationPrefix;
			newRouteItem.renderLabel = LocationLabel;
			newRouteItem.params = {
				...LOCATION_PARAMS,
				...newRouteItem.params,
				filters: { ...LOCATION_PARAMS.filters, type: locationTypeFilter, ...newRouteItem?.params?.filters },
			};
		}
		return newRouteItem || {};
	});

	return newControls || [];
};
export default getControls;
