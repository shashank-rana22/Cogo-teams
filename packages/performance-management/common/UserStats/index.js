import { SelectController, useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import feedbackDataColumns from '../../constants/feedback-data-columns';
import useListUserFeedbacks from '../../hooks/useListUserFeedbacks';
import getMonthControls from '../../utils/monthControls';
import useGetColumns from '../Columns';
import PerformanceChart from '../PerformanceChart';
import UserTableData from '../UserTableData';

import styles from './styles.module.css';
import UserProfile from './UserProfile';

function UserStats({ source = '' }) {
	const router = useRouter();

	const {
		general: {
			query: { user_id = '', path = '' },
		},
	} = useSelector((state) => state);

	const userId = user_id;

	const handleClick = () => {
		router.push(`${path}`);
	};

	const formProps =	useForm();
	const { watch: watchDateFilter, control } = formProps;

	const {
		feedbackData = {}, loading, params, setParams,
		setPage,
	} = useListUserFeedbacks({
		userId,
		rating_required: 'yes',
	});

	const { list = [], pagination_data = {} } = feedbackData;

	const { total_count = '' } = pagination_data;

	const monthControls = getMonthControls(params.Year, params.Month);

	const monthFilter = watchDateFilter('month');
	const yearFilter = watchDateFilter('year');
	const ratingFilter = watchDateFilter('rating');

	useEffect(() => setParams((pv) => ({
		...pv,
		Month  : monthFilter || undefined,
		Year   : yearFilter || undefined,
		Rating : ratingFilter || undefined,
		Page   : 1,
	// eslint-disable-next-line react-hooks/exhaustive-deps
	})), [monthFilter, yearFilter, ratingFilter]);

	const columnsToShow = feedbackDataColumns.userStats;

	const columns = useGetColumns({ columnsToShow });

	return (
		<div className={styles.container}>
			{source !== 'user_dashboard' && (
				<div className={styles.redirect_container}>
					<div
						style={{ cursor: 'pointer' }}
						role="button"
						tabIndex={0}
						onClick={() => {
							handleClick();
						}}
					>
						<IcMArrowBack style={{ marginRight: '8px' }} width={16} height={16} />
					</div>

					<div>User Stats</div>
				</div>
			)}

			<div className={styles.stats_container}>
				{source === 'user_dashboard' && <p className={styles.header}>User Dashboard</p>}

				<div className={styles.user_profile}><UserProfile userId={userId} /></div>

				<div className={styles.header_filters}>
					<div className={styles.filter_container}>

						{monthControls.map((cntrl) => (
							<div
								className={styles.month_container}
								key={cntrl.name}
							>
								<SelectController
									{...cntrl}
									control={control}
									formProps={formProps}
								/>
							</div>
						))}

					</div>
				</div>

				<div className={styles.performance_chart}>
					<PerformanceChart userId={userId} />
				</div>

				<div className={styles.list_header}>
					Feedback List
				</div>

				<UserTableData
					columns={columns}
					list={list}
					page_limit={params.PageLimit}
					total_count={total_count}
					loading={loading}
					pagination={params.Page}
					setPagination={setPage}
				/>
			</div>
		</div>
	);
}

export default UserStats;
