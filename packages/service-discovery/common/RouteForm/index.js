import AIRRouteForm from './AIR';
import FCLRouteForm from './FCL';
import LCLRouteForm from './LCL';

const COMPONENT_MAPPING = {
	fcl_freight : FCLRouteForm,
	air_freight : AIRRouteForm,
	lcl_freight : LCLRouteForm,
};
function RouteForm(props) {
	const { mode = '' } = props;

	const ActiveComponent = COMPONENT_MAPPING[mode];

	if (!ActiveComponent) return null;

	return (
		<ActiveComponent {...props} />
	);
}

export default RouteForm;
