import Global from '../components/Dashboard/Global';
import Objectives from '../components/Dashboard/Objectives';

const getDashboardComponentsMapping = ({ t = () => {} }) => ({
	global: {
		name      : 'global',
		title     : t('allocation:tab_global_label'),
		component : Global,
	},
	objectives: {
		name      : 'objectives',
		title     : t('allocation:tab_objective_label'),
		component : Objectives,
	},
});

export default getDashboardComponentsMapping;
