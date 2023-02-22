import { SelectController, useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import PerformanceChart from '../../common/PerformanceChart';
import UserProfile from '../../common/UserProfile';
import UserFeedbackData from '../../common/UserStats/UserFeedbackData';
import useListUserFeedbacks from '../../hooks/useListUserFeedbacks';
import getMonthControls from '../../utils/monthControls';

import styles from './styles.module.css';

function UserDashboard() {
	const monthControls = getMonthControls();

	const formProps = useForm();
	const { watch: watchDateFilter, control } = formProps;

	const monthFilter = watchDateFilter('month');
	const yearFilter = watchDateFilter('year');
	const ratingFilter = watchDateFilter('rating');

	const {
		general,
		profile,
	} = useSelector((state) => state);

	const { user_id = '' } = general;
	const { user = {} } = profile;

	const userId = user_id || user.id;

	const { setParams } = useListUserFeedbacks({
		userId,
	});

	useEffect(() => setParams((pv) => ({
		...pv,
		Month  : monthFilter || undefined,
		Year   : yearFilter || undefined,
		Rating : ratingFilter || undefined,
	// eslint-disable-next-line react-hooks/exhaustive-deps
	})), [monthFilter, yearFilter, ratingFilter]);

	return (
		<div className={styles.container}>
			<p className={styles.header}>User Dashboard</p>
			<div className={styles.user_profile}><UserProfile userId={userId} /></div>

			<div className={styles.header_filters}>
				<div className={styles.filter_container}>
					<div className={styles.month_container}>
						<div>
							<SelectController
								{...monthControls.month}
								control={control}
								formProps={formProps}
							/>
						</div>
					</div>
					<div className={styles.month_container}>
						<div>
							<SelectController
								{...monthControls.year}
								control={control}
								formProps={formProps}
							/>
						</div>
					</div>
					<div className={styles.month_container}>
						<div>
							<SelectController
								{...monthControls.rating}
								control={control}
								formProps={formProps}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.performance_chart}>
				<PerformanceChart userId={userId} />
			</div>

			<UserFeedbackData userId={userId} />
		</div>
	);
}

export default UserDashboard;
