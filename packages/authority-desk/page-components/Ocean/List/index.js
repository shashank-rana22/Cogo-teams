import { Loader, Pagination, Tabs, TabPanel } from '@cogoport/components';

import EmptyState from '../../../commons/EmptyState';

import ListCard from './ListCard';
import styles from './styles.module.css';

export default function List({
	data = {},
	filters = {},
	setFilters = () => {},
	tabsState = {},
	setTabsState = () => {},
	role = '',
	additionalTabs = [],
	loading = false,
	refetch = () => {},
}) {
	const { bucket = '', subApprovedBucket = '' } = tabsState;

	const { count_stats, total_count } = data;

	const renderPagination = (
		<Pagination
			type="table"
			totalItems={total_count}
			pageSize={10}
			currentPage={filters.page}
			onPageChange={(val) => setFilters({
				...filters,
				page: val,
			})}
		/>
	);

	if (loading) {
		return 	(
			<div className={styles.loader}>
				Loading Documents Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	return (
		<div className={styles.list_container}>
			{bucket === 'approved' ? (
				<div>
					<Tabs
						activeTab={subApprovedBucket}
						themeType="primary"
						onChange={(val) => {
							setTabsState({
								...tabsState,
								subApprovedBucket: val,
							});
						}}
						className={styles.tab_panel}
					>
						{additionalTabs.map((tab) => {
							const { name, title } = tab;
							return (
								<TabPanel
									name={name}
									title={title}
									badge={count_stats[name] || 0}
								/>
							);
						})}
					</Tabs>
				</div>
			) : null}

			{data?.list?.length === 0
				? <EmptyState /> : (data?.list || []).map((item) => (
					<ListCard
						key={item?.id}
						item={item}
						role={role}
						tabsState={tabsState}
						filters={filters}
						setFilters={setFilters}
						refetch={refetch}
					/>
				))}

			{renderPagination}
		</div>
	);
}
