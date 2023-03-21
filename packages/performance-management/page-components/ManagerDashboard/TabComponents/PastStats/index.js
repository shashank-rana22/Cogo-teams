import { Toast, Select } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import PerformanceChart from '../../../../common/PerformanceChart';
import useGetMonthStats from '../../../../hooks/useGetMonthStats';
import getMonthControls from '../../../../utils/monthControls';
import TeamMembersList from '../../TeamMembersList';

import styles from './styles.module.css';

function PastStats() {
	const { data = {}, loading = false, params, setParams, setPage } = useGetMonthStats();

	const { list = [], pagination_data = {}, is_manager = true } = data;

	const { total_count = '' } = pagination_data;
	const monthControls = getMonthControls(params?.Year, params?.Month);

	const setFilter = (val, type) => {
		setParams({ ...params, [type]: val || undefined, Page: 1 });
	};

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
		<div>
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

export default PastStats;
