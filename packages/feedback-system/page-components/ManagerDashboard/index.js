import { Select, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import PerformanceChart from '../../common/PerformanceChart';
import useGetMonthStats from '../../hooks/useGetMonthStats';
import getMonthControls from '../../utils/monthControls';

import styles from './styles.module.css';
import TeamMembersList from './TeamMembersList';

function ManagerDashboard() {
	const { profile:{ user:{ id: manager_id = '' } } } = useSelector((state) => state);

	const { data = {}, loading = false, params, setParams, setPage } = useGetMonthStats({ manager_id });

	const { list = [], pagination_data = {} } = data;
	const { total_count = '' } = pagination_data;

	const monthControls = getMonthControls(params?.Year, params?.Month);

	const router = useRouter();

	const setFilter = (val, type) => {
		setParams({ ...params, [type]: val || undefined });
	};

	const handleClick = () => {
		router.push('/feedback-system/manager-dashboard/feedback-management');
	};

	return (
		<div>
			<p className={styles.header_text}>
				Manager Dashboard
			</p>

			<div className={styles.page_actions}>
				<div className={styles.filters}>
					{monthControls.map((cntrl) => {
						const value = startCase(cntrl.name);
						if (['year', 'month'].includes(cntrl.name)) {
							return (
								<Select
									{...cntrl}
									value={params[value]}
									onChange={(val) => setFilter(val, value)}
									placeholder={`Select ${value}`}
									style={{ marginRight: '8px' }}
									options={cntrl.options}
								/>
							);
						}
						return null;
					})}

				</div>

				<Button
					themeType="primary"
					size="lg"
					onClick={() => {
						handleClick();
					}}
				>
					Submit Feedback
				</Button>
			</div>

			<div className={styles.stats_section}>
				<PerformanceChart params={params} />
			</div>

			<div className={styles.list_section}>
				<div className={styles.list_header}>
					<p className={styles.list_title}>
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
