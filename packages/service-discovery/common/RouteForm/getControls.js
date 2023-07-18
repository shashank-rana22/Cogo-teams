import { IcMLocation } from '@cogoport/icons-react';

import airRouteControls from '../../configs/RouteFormControls/air-route-controls';
import customsRouteControls from '../../configs/RouteFormControls/customs-route-controls';
import fclRouteControls from '../../configs/RouteFormControls/fcl-route-controls';
import ftlRouteControls from '../../configs/RouteFormControls/ftl-route-controls';
import haulageRouteControls from '../../configs/RouteFormControls/haulage-route-controls';
import lclRouteControls from '../../configs/RouteFormControls/lcl-route-controls';
import ltlRouteControls from '../../configs/RouteFormControls/ltl-route-controls';
import trailerRouteControls from '../../configs/RouteFormControls/trailer-route-controls';
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
	page_limit      : 20,
	includes        : { default_params_required: true },
	filters         : { status: 'active' },
	recommendations : true,
};

const ROUTE_CONTROLS_MAPPING = {
	fcl_freight     : fclRouteControls,
	lcl_freight     : lclRouteControls,
	air_freight     : airRouteControls,
	trailer_freight : trailerRouteControls,
	haulage_freight : haulageRouteControls,
	ftl_freight     : ftlRouteControls,
	ltl_freight     : ltlRouteControls,
	customs         : customsRouteControls,
	locals          : customsRouteControls,
};

const getControls = (service) => {
	const routeControls = ROUTE_CONTROLS_MAPPING[service] || [];

	let locationTypeFilter = [];

	MODES.forEach((modeItem) => {
		if (modeItem.value === service) locationTypeFilter = modeItem.type;
	});

	const newControls = routeControls.map((routeItem) => {
		const newRouteItem = { ...routeItem };

		if (routeItem.asyncKey && ['list_locations', 'list_locations_v2'].includes(routeItem.asyncKey)) {
			newRouteItem.prefix = LocationPrefix;
			newRouteItem.renderLabel = LocationLabel;
			newRouteItem.params = {
				...LOCATION_PARAMS,
				...newRouteItem.params,
				filters: { ...LOCATION_PARAMS.filters, type: locationTypeFilter, ...newRouteItem.params?.filters },
			};
		}
		return newRouteItem || {};
	});

	return newControls || [];
};
export default getControls;
