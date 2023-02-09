import { useSelector } from '@cogoport/store';

import PerformanceChart from '../../common/PerformanceChart';
import UserProfile from '../../common/UserProfile';

import styles from './styles.module.css';
import UserFeedbackData from './UserFeedbackData';

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
			<div className={styles.header}>
				<div className={styles.performance_chart}>
					<PerformanceChart userId={userId} />
				</div>

				<div className={styles.user_profile}><UserProfile profileData={user} /></div>
			</div>

			<UserFeedbackData userId={userId} />
		</div>
	);
}

export default UserDashboard;
