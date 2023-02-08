import { useSelector } from '@cogoport/store';

import PerformanceChart from '../../common/PerformanceChart';
import UserProfile from '../../common/UserProfile';

import styles from './styles.module.css';
import UserFeedbackData from './UserFeedbackData';

function UserDashboard() {
	const {
		general: {
			query: { user_id = '' },
		},
		profile: { user: { id = '' } },
	} = useSelector((state) => state);

	const userId = user_id || id;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.performance_chart}>
					<PerformanceChart userId={userId} />
				</div>

				<div className={styles.user_profile}><UserProfile userId={userId} /></div>
			</div>

			<UserFeedbackData userId={userId} />
		</div>
	);
}

export default UserDashboard;
