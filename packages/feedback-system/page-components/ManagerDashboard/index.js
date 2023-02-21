import { Select, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import PerformanceChart from '../../common/PerformanceChart';
import useGetMonthStats from '../../hooks/useGetMonthStats';
import getMonthControls from '../../utils/monthControls';

import styles from './styles.module.css';
import TeamMembersList from './TeamMembersList';

function ManagerDashboard() {
	// const [selectedBucket, setSelectedBucket] = useState('');

	const { data = {}, loading = false, params, setParams, setPage } = useGetMonthStats({ });

	const { list = [], pagination_data = {} } = data;
	const { total_count = '' } = pagination_data;

	const monthControls = getMonthControls();

	const Router = useRouter();

	const setFilter = (val, type) => {
		setParams({ ...params, filters: { ...(params.filters || {}), [type]: val } });
	};

	const handleClick = () => {
		Router.push('/feedback-system/manager-dashboard/feedback-management');
	};

	return (
		<div>
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
			</div>

			<div className={styles.list_section}>
				<div className={styles.list_header}>
					<p className={styles.list_header_text}>
						Team Members Feedback List
					</p>
				</div>

				<div className={styles.table_section}>
					<TeamMembersList
						list={list}
						loading={loading}
						page_limit={params.page_limit}
						total_count={total_count}
						pagination={params.page}
						setPagination={setPage}
					/>
				</div>
			</div>
		</div>
	);
}

export default ManagerDashboard;
