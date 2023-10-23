import useGetIsMobile from '../../helpers/useGetIsMobile';

import AIRRouteForm from './AIR';
import FCLRouteForm from './FCL';
import FTLRouteForm from './FTL';
import LCLRouteForm from './LCL';
import LTLRouteForm from './LTL';

const COMPONENT_MAPPING = {
	fcl_freight : FCLRouteForm,
	air_freight : AIRRouteForm,
	lcl_freight : LCLRouteForm,
	ftl_freight : FTLRouteForm,
	ltl_freight : LTLRouteForm,
};
function RouteForm(props) {
	const isMobile = useGetIsMobile();

	const { mode = '' } = props;

	const ActiveComponent = COMPONENT_MAPPING[mode];

	if (!ActiveComponent) return null;

	return (
		<ActiveComponent {...props} isMobile={isMobile} />
	);
}

export default RouteForm;
