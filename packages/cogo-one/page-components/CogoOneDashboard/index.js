import { useSelector } from '@cogoport/store';

import getViewTypeMapping from '../../constants/IDS_CONSTANTS';
import useAgentWorkPrefernce from '../../hooks/useAgentWorkPrefernce';

import AdminDashboard from './components/AdminDashboard';
import AgentDashboard from './components/AgentDashboard';
import styles from './styles.module.css';

const DASHBOARD_COMPONENT_MAPPING = {
	agent : AgentDashboard,
	admin : AdminDashboard,
};

function CogoOneDashboard() {
	const {
		userData,
	} = useSelector(({ profile }) => ({
		userData: profile.partner,
	}));

	const { user_role_ids: userRoleIds = [] } = userData || {};

	const { viewType } = useAgentWorkPrefernce();

	const { ROLE_IDS_CHECK } = getViewTypeMapping();

	const isRolePresent = userRoleIds.some((itm) => ROLE_IDS_CHECK.kam_view.includes(itm));

	const dashboardType = isRolePresent ? 'agent' : 'admin';

	const Component = DASHBOARD_COMPONENT_MAPPING[dashboardType];

	return (
		<div>
			<div className={styles.prime_container}>
				<Component isRolePresent={isRolePresent} viewType={viewType} />
			</div>
		</div>
	);
}
export default CogoOneDashboard;
