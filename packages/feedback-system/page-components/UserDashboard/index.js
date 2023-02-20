import { useSelector } from '@cogoport/store';

import PerformanceChart from '../../common/PerformanceChart';
import UserProfile from '../../common/UserProfile';
import UserFeedbackData from '../../common/UserStats/UserFeedbackData';

import styles from './styles.module.css';

function UserDashboard() {
	const {
		general,
		profile,
	} = useSelector((state) => state);

	const { user_id = '' } = general;
	const { user = {} } = profile;

	const userId = user_id || user.id;

	return (
		<div className={styles.container}>
			<p className={styles.header}>User Dashboard</p>
			<div className={styles.user_profile}><UserProfile profileData={user} /></div>

			<div className={styles.performance_chart}>
				<PerformanceChart userId={userId} />
			</div>

			<UserFeedbackData userId={userId} />
		</div>
	);
}

export default UserDashboard;
