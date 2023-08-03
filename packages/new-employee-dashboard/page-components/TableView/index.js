import { Tabs, TabPanel, Input, Pagination, Toggle, Button, Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../common/EmptyState';
import useBulkEmployeeDetails from '../hooks/useBulkEmployeeDetails';
import StyledTable from '../StyledTable';

import FilterPopover from './FilterPopover';
import styles from './styles.module.css';
import useRejectAction from './useRejectAction';
import useTableView from './useTableView';

const TOTAL_COUNT = 10;
const INITIAL_TOTAL_COUNT = 0;
const INITIAL_PAGE = 1;
const PAGELIMIT_OPTIONS = [
	{ label: 10, value: 10 },
	{ label: 50, value: 50 },
	{ label: 100, value: 100 },
	{ label: 200, value: 200 },
];
const INITIAL_PAGE_LIMIT = 10;

function TableView({ search, setSearch }) {
	const { btnloading, updateEmployeeStatus } = useRejectAction();
	const [bulkAction, setBulkAction] = useState(false);
	const [pageLimit, setPageLimit] = useState(INITIAL_PAGE_LIMIT);
	const [selectedIds, setSelectedIds] = useState([]);

	const {
		columns, loading, list, setActiveTab, activeTab, data, setPage, page, filters, setFilters,
	} = useTableView({ search, btnloading, updateEmployeeStatus, bulkAction, pageLimit, selectedIds, setSelectedIds });

	const { btnloading:bulkloading, sendBulkActionMail } = useBulkEmployeeDetails({ selectedIds });

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
					<div className={styles.styled_button}>
						<Button
							themeType="secondary"
							disabled={isEmpty(selectedIds)}
							onClick={sendBulkActionMail}
							loading={bulkloading}
						>
							Send email
						</Button>
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
							<div className={styles.text}> Page Limit : </div>
							<Select
								onChange={(val) => setPageLimit(val)}
								value={pageLimit}
								options={PAGELIMIT_OPTIONS}
								size="sm"
								placeholder="Page Limit"
								style={{ paddingRight: '10px', paddingTop: '5px' }}
							/>
							<Pagination
								totalItems={data?.total_count || INITIAL_TOTAL_COUNT}
								currentPage={page || INITIAL_PAGE}
								pageSize={data?.page_limit}
								onPageChange={setPage}
								type="table"
								style={{ paddingTop: '5px' }}
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
