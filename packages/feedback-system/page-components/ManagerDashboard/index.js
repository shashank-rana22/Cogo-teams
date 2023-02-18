import { Select, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useGetColumns from '../../common/Columns';
import PerformanceChart from '../../common/PerformanceChart';
import TeamStats from '../../common/TeamStats';
import UserTableData from '../../common/userTableData';
import useListUserFeedbacks from '../../hooks/useListUserFeedbacks';
import getMonthControls from '../../utils/monthControls';

import styles from './styles.module.css';

function ManagerDashboard() {
	const [selectedBucket, setSelectedBucket] = useState('');

	const feedbackColumns = useGetColumns({ source: 'manager_dashboard' });

	const { params, setParams, data, loading, setPage } = useListUserFeedbacks({});

	const monthControls = getMonthControls(params.filters.created_at_year);

	const setFilter = (val, type) => {
		setParams({ ...params, filters: { ...(params.filters || {}), [type]: val } });
	};

	const { list: newTeamList, page_limit, total_count } = data || {};

	const Router = useRouter();
	const handleClick = () => {
		Router.push('/feedback-system/manager-dashboard/feedback-management');
	};

	return (
		<div className={styles.container}>
			<p className={styles.header_text}>
				Manager Dashboard
			</p>

			<div className={styles.page_actions}>
				<div className={styles.filters}>
					<Select
						value={params.filters?.created_at_year}
						onChange={(val) => setFilter(val, 'created_at_year')}
						placeholder="Select Year"
						style={{ marginRight: '8px' }}
						options={monthControls.created_at_year.options}
					/>

					<Select
						value={params.filters?.created_at_month}
						onChange={(val) => setFilter(val, 'created_at_month')}
						disabled={!params.filters?.created_at_year}
						placeholder="Select Month"
						style={{ marginRight: '8px' }}
						options={monthControls.created_at_month.options}
					/>

				</div>

				<Button
					themeType="accent"
					size="lg"
					onClick={() => {
						handleClick();
					}}
				>
					Submit Feedback
				</Button>
			</div>

			<div className={styles.stats_section}>
				<PerformanceChart />

				<TeamStats
					setParams={setParams}
					selectedBucket={selectedBucket}
					setSelectedBucket={setSelectedBucket}
				/>
			</div>

			<div className={styles.list_section}>
				<div className={styles.list_header}>
					<p className={styles.list_header_text}>
						Team Members Feedback List
					</p>
				</div>

				<UserTableData
					columns={feedbackColumns}
					list={newTeamList}
					loading={loading}
					page_limit={page_limit}
					total_count={total_count}
					pagination={params.page}
					setPagination={setPage}
				/>
			</div>
		</div>
	);
}

export default ManagerDashboard;
