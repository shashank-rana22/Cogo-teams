import { Toast } from '@cogoport/components';

import EmptyState from '../../../../common/EmptyState';
import Filters from '../../../../common/Filters';
import PerformanceChart from '../../../../common/PerformanceChart';
import useGetMonthStats from '../../../../hooks/useGetMonthStats';
import TeamMembersList from '../../TeamMembersList';

import styles from './styles.module.css';

function PastStats() {
	const { data = {}, loading = false, params = {}, setParams, setPage } = useGetMonthStats();

	const { list = [], pagination_data = {}, is_manager = true } = data;

	const { total_count = '' } = pagination_data;

	if (!is_manager) {
		Toast.error('No Account Found In Your Team, Kindly Visit User Dashboard for Info Relevant to your accounts');
		return (
			<div className={styles.no_manager}>
				<EmptyState
					height="60%"
					width="50%"
					emptyText="No Account Found In Your Team"
				/>
			</div>
		);
	}

	return (
		<>
			<div className={styles.filters}>
				<Filters source="past_stats" params={params} setParams={setParams} />
			</div>

			<div className={styles.stats_section}>
				<PerformanceChart params={params} />
			</div>

			<div className={styles.list_section}>
				<div className={styles.list_header}>
					<div className={styles.list_title}>
						Team Members Feedback List
					</div>
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
		</>
	);
}

export default PastStats;
