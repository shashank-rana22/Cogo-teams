import { useSelector } from '@cogoport/store';

import getViewTypeMapping from '../../constants/IDS_CONSTANTS';

import AdminDashboard from './components/AdminDashboard';
import AgentDashboard from './components/AgentDashboard';
import styles from './styles.module.css';

function CogoOneDashboard() {
	const {
		userData,
	} = useSelector(({ profile }) => ({
		userData: profile.partner,
	}));

	const { user_role_ids: userRoleIds = [] } = userData || {};

	const { ROLE_IDS_CHECK } = getViewTypeMapping();

	const isRolePresent = userRoleIds.some((itm) => ROLE_IDS_CHECK.kam_view.includes(itm));

	return (
		<div>
			<div className={styles.prime_container}>
				{isRolePresent
					? <AgentDashboard isRolePresent={isRolePresent} />
					: <AdminDashboard />}
			</div>
		</div>
	);
}
export default CogoOneDashboard;
