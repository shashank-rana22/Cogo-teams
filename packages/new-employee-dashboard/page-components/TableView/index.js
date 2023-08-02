import { Tabs, TabPanel, Input, Pagination, Toggle, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../common/EmptyState';
import StyledTable from '../StyledTable';

import FilterPopover from './FilterPopover';
import styles from './styles.module.css';
import useRejectAction from './useRejectAction';
import useTableView from './useTableView';

const TOTAL_COUNT = 10;
const INITIAL_TOTAL_COUNT = 0;
const INITIAL_PAGE = 1;

function TableView({ search, setSearch }) {
	const { btnloading, updateEmployeeStatus } = useRejectAction();
	const [bulkAction, setBulkAction] = useState(false);

	const {
		columns, loading, list, setActiveTab, activeTab, data, setPage, page, filters, setFilters,
	} = useTableView({ search, btnloading, updateEmployeeStatus, bulkAction });

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
					<TabPanel name="rejected_by_user" title="Rejected By User" />
				</Tabs>
				<div className={styles.bulkupload_container}>
					BulkAction
					<Toggle
						onChange={(val) => setBulkAction(val?.target?.checked)}
						value={bulkAction}
						styles={{ marginBottom: '30px' }}
					/>
				</div>
				{bulkAction && (
					<div>
						<Button themeType="secondary"> Send email </Button>
					</div>
				)}

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

			{!isEmpty(list || []) || loading ? (
				<>
					<StyledTable
						columns={columns}
						data={list}
						loading={loading}
					/>

					{data?.total_count > TOTAL_COUNT && (
						<div className={styles.pagination_container}>
							<Pagination
								totalItems={data?.total_count || INITIAL_TOTAL_COUNT}
								currentPage={page || INITIAL_PAGE}
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
