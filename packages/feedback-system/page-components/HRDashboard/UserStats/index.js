import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';

// import PerformanceChart from '../../../feedback-user-dashboard/common/PerformanceChart';
// import UserProfile from '../../../feedback-user-dashboard/common/UserProfile';
// import UserFeedbackData from '../../../feedback-user-dashboard/components/user-dashboard/UserFeedbackData';

import styles from './styles.module.css';

function UserDashboard() {
	const Router = useRouter();

	const {
		general: {
			query: { user_id = '', path = '' },
		},
		profile: { id = '' },
	} = useSelector((state) => state);

	const userId = user_id || id;

	const handleClick = () => {
		Router.push(`${path}`);
	};

	return (
		<div className={styles.Container}>
			<div>
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

				<div>
					{/* <Row>
						<Col md={6}>
							<PerformanceChart userId={userId} />
						</Col>

						<Col md={6}>
							<UserProfile userId={userId} />
						</Col>
					</Row>

					<UserFeedbackData userId={userId} /> */}
				</div>
			</div>
		</div>
	);
}

export default UserDashboard;
