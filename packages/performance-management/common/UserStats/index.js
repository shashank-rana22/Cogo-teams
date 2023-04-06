import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import feedbackDataColumns from '../../constants/feedback-data-columns';
import useListUserFeedbacks from '../../hooks/useListUserFeedbacks';
import useGetColumns from '../Columns';
import Filters from '../Filters';
import PerformanceChart from '../PerformanceChart';
import UserTableData from '../UserTableData';

import styles from './styles.module.css';
import UserProfile from './UserProfile';

function UserStats({ source = '' }) {
	const router = useRouter();
	const [userId, setUserId] = useState('');

	const {
		general: {
			query: { user_id = '', path = '' },
		},
	} = useSelector((state) => state);

	const handleClick = () => {
		router.push(`${path}`);
	};

	const {
		feedbackData = {}, loading, params, setParams,
		setPage,
	} = useListUserFeedbacks({
		userId,
		rating_required: source === 'user_dashboard' ? undefined : 'yes',
	});

	const { list = [], pagination_data = {} } = feedbackData;

	const { total_count = '' } = pagination_data;

	const columnsToShow = feedbackDataColumns.userStats;

	const columns = useGetColumns({ columnsToShow });

	useEffect(() => { if (user_id) { setUserId(user_id); } }, [user_id]);

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

				<div className={styles.filter_container}>
					<Filters source="user_dashboard" params={params} setParams={setParams} />

				</div>

				<div className={styles.performance_chart}>
					<PerformanceChart userId={userId} params={params} />
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
