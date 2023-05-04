import { Loader, Pagination } from "@cogoport/components";
import { Tabs, TabPanel } from "@cogoport/components";
import EmptyState from "../../../commons/EmptyState";

import ListCard from "./ListCard";
import styles from "./styles.module.css";

export default function List({
	data = {},
	allFilters = {},
	setAllFilters = () => {},
	role = "",
	additionalTabs = [], 
	loading = false,
}) {
	const { filters, bucket, subApprovedBucket } = allFilters;
	// const { list = [], total } = data;

	const { count_stats } = data;

	const renderPagination = (
		<Pagination
			type="table"
			// totalItems={total}
			pageSize={10}
			currentPage={filters.page}
			onPageChange={(val) =>
				setAllFilters({
					...allFilters,
					filters: {
						...allFilters.filters,
						page: val,
					},
				})
			}
		/>
	); 


	if (loading) {
		return <Loader themeType="primary" />;
	}

	return data?.list?.length === 0 ? <EmptyState /> : (
		<>

			<div className={styles.list_container}>
				{bucket === "approved" ? (
					<div>
						<Tabs
							activeTab={subApprovedBucket}
							themeType="primary"
							onChange={(val) => {
								setAllFilters({
									...allFilters,
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

				{(data?.list || []).map((item) => (
					<ListCard
						key={item?.id}
						item={item}
						role={role}
						allFilters={allFilters}
					/>
				))}
			</div>

			{renderPagination}
		</>
	);
}
