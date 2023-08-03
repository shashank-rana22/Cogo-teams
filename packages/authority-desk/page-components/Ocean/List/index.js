import { Loader, Pagination, Tabs, TabPanel } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../commons/EmptyState';

import ListCard from './ListCard';
import styles from './styles.module.css';

const PAGE_LIMIT = 10;
const FALLBACK_VALUE = 0;

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

	if (loading) {
		return 	(
			<div className={styles.loader}>
				Loading Documents....
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
									key={name}
									name={name}
									title={title}
									badge={count_stats[name] || FALLBACK_VALUE}
								/>
							);
						})}
					</Tabs>
				</div>
			) : null}

			{isEmpty(data?.list)
				? <EmptyState />
				: (
					<>
						{	(data?.list || []).map((item) => (
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

						{total_count > PAGE_LIMIT
							? (
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
							) : null}
					</>
				)}
		</div>
	);
}
