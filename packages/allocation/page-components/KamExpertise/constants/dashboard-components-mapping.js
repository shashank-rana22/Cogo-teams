import Global from '../components/Dashboard/Global';
import Objectives from '../components/Dashboard/Objectives';

const DASHBOARD_COMPONENTS_MAPPING = {
	global: {
		name      : 'global',
		title     : 'Global',
		component : Global,
	},
	objectives: {
		name      : 'objectives',
		title     : 'Objectives',
		component : Objectives,
	},
};

export default DASHBOARD_COMPONENTS_MAPPING;
