import { Tabs, TabPanel, Input, Pagination } from '@cogoport/components';
import React from 'react';

import EmptyState from '../../common/EmptyState';
import StyledTable from '../StyledTable';

import FilterPopover from './FilterPopover';
import styles from './styles.module.css';
import useTableView from './useTableView';

function TableView({ search, setSearch }) {
	const {
		columns, loading, list, setActiveTab, activeTab, data, setPage, page, filters, setFilters,
	} = useTableView({ search });

	return (
		<div className={styles.container}>
			<div className={styles.filter_container}>
				<Tabs
					activeTab={activeTab}
					themeType="tertiary"
					onChange={setActiveTab}
					style={{ marginBottom: 6 }}
				>
					<TabPanel name="active" title="Active" />
					<TabPanel name="inactive" title="Inactive" />
				</Tabs>

				<div className={styles.filter_options}>
					<Input
						value={search}
						onChange={setSearch}
						size="md"
						style={{ marginRight: '8px', width: 300, height: 40 }}
						placeholder="Search via Name or Email"
					/>
					<FilterPopover filters={filters} setFilters={setFilters} />
				</div>
			</div>

			{(list || []).length > 0 || loading ? (
				<>
					<StyledTable
						columns={columns}
						data={list}
						loading={loading}
					/>

					{data?.total_count > 10 && (
						<div className={styles.pagination_container}>
							<Pagination
								totalItems={data?.total_count || 0}
								currentPage={page || 1}
								pageSize={data?.page_limit}
								onPageChange={setPage}
							/>
						</div>
					)}
				</>
			) : (
				<EmptyState
					flexDirection="column"
					emptyText="No Record Found"
					textSize={20}
				/>
			)}
		</div>
	);
}

export default TableView;
