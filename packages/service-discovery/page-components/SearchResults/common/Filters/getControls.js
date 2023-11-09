import { getAirControls, defaultValues as airDefaultValues } from '../../configurations/air/filters';
import { getFclControls, getDefaultValues as getFclDefaultValues } from '../../configurations/fcl/filters';
import { getFtlControls, DEFAULT_VALUES as ftlDefaultValues } from '../../configurations/ftl/filters';

const getControls = ({
	service_type = '',
	spot_search_id = '',
	airlines = [],
	airlineParams = {},
	setAirlineParams = () => {},
	// transitTime = {},
}) => {
	const MAPPING = {
		fcl_freight: {
			controls      : getFclControls({ id: spot_search_id }),
			defaultValues : getFclDefaultValues(),
		},
		air_freight: {
			controls      : getAirControls({ airlines, airlineParams, setAirlineParams }),
			defaultValues : airDefaultValues,
		},
		ftl_freight: {
			controls      : getFtlControls(),
			defaultValues : ftlDefaultValues,
		},
	};

	return MAPPING[service_type] || {};
};

export default getControls;
