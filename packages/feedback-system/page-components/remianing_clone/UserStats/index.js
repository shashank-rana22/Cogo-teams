import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';

import PerformanceChart from '../../../common/PerformanceChart';
import UserProfile from '../../../common/UserProfile';
import UserFeedbackData from '../../UserDashboard/UserFeedbackData';

import styles from './styles.module.css';

function UserDashboard() {
	const Router = useRouter();

	const {
		general: {
			query: { user_id = '', path = '' },
		},
		profile: { user = {} },
	} = useSelector((state) => state);

	const userId = user_id || user.id;

	const handleClick = () => {
		Router.push(`${path}`);
	};

	return (
		<div className={styles.container}>
			<div
				className={styles.redirect_container}
				role="button"
				tabIndex={0}
				onClick={() => {
					handleClick();
				}}
			>
				<IcMArrowBack style={{ marginRight: '8px' }} width={16} height={16} />
				Go Back
			</div>

			<div className={styles.stats_container}>
				<div className={styles.header}>
					<div className={styles.performance_chart}>
						<PerformanceChart userId={userId} />
					</div>

					<div className={styles.user_profile}><UserProfile userId={userId} /></div>
				</div>

				<UserFeedbackData userId={userId} />
			</div>
		</div>
	);
}

export default UserDashboard;
