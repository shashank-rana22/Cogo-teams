import { SelectController, useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import useListUserFeedbacks from '../../hooks/useListUserFeedbacks';
import getMonthControls from '../../utils/monthControls';
import PerformanceChart from '../PerformanceChart';
import UserProfile from '../UserProfile';

import styles from './styles.module.css';
import UserFeedbackData from './UserFeedbackData';

function UserStats() {
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

	const monthControls = getMonthControls();

	const formProps =	useForm();
	const { watch: watchDateFilter, control } = formProps;

	const { setParams } = useListUserFeedbacks({
		userId,
	});
	const monthFilter = watchDateFilter('created_at_month');
	const yearFilter = watchDateFilter('created_at_year');
	const ratingFilter = watchDateFilter('rating');

	useEffect(() => setParams((pv) => ({
		...pv,
		filters: {
			...(pv.filters),
			created_at_month : monthFilter || undefined,
			created_at_year  : yearFilter || undefined,
			rating           : ratingFilter || undefined,
		},
	// eslint-disable-next-line react-hooks/exhaustive-deps
	})), [monthFilter, yearFilter, ratingFilter]);

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
		</div>
	);
}

export default UserStats;
