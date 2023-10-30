import { Select, Table, Pagination } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import useGetDownloadDetails from '../../../hooks/useGetDownloadDetails';
import useUpdatePayroll from '../../../hooks/useUpdatePayroll';
import useUploadFinanceDocuments from '../../../hooks/useUploadFinanceDocuments';

import getFinanceColumns from './getFinanceColumns';
import styles from './styles.module.css';

const STATUS_OPTIONS = [
	{ label: 'Paid', value: 'paid' },
	{ label: 'Processed', value: 'processed' },
	{ label: 'Failed', value: 'failed' },
	{ label: 'Approved', value: 'approved' },
];

// const data = [
// 	{
// 		name            : 'tanner',
// 		order_ticket_id : '1',
// 		type            : 'Payroll',
// 		remarks         : 'idc',
// 		amount          : '123214',
// 		status          : 'processed',

// 	},
// ];

const MAX_LIMIT = 10;
function FinanceTable({ data = {}, loading = false, filters, setFilters, refetch }) {
	const [show, setShow] = useState('');
	const { list, page, page_limit, total_count } = data || {};
	const { control, handleSubmit } = useForm();
	console.log('🚀 ~ file: index.js:29 ~ FinanceTable ~ list:', list);
	const { uploadDocument } = useUploadFinanceDocuments();
	const onPageChange = (pageNumber) => {
		console.log('page');
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
	};

	console.log('filters', filters);

	const { createDownload } = useGetDownloadDetails();
	const { updatePayroll } = useUpdatePayroll({ refetch });
	const columns = getFinanceColumns({
		STATUS_OPTIONS,
		updatePayroll,
		createDownload,
		control,
		show,
		setShow,
		handleSubmit,
		uploadDocument,
	});

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.header}>
					<div
						className={styles.arrow_back}
						aria-hidden
					>
						<div className={styles.heading}>

							<div className={styles.upper_heading}>BATCHES RECEIVED</div>
							<div className={styles.lower_heading}>
								Please update the status of the batches
							</div>
						</div>
					</div>
					<div className={styles.heading}>
						<div className={styles.search_bar}>
							<div className={styles.sb_left}>
								{/* <SelectController
									size="md"
									placeholder="date"
									className={styles.select_input}
									name="filter_date"
									control={control}
									options={DATE_OPTIONS}
									onChange={(e) => {
										setFilters((prev) => ({ ...prev, date_sort: e, page: 1 }));
										setSelectedMonth(e);
									}}
								/> */}
								<Select
									placeholder="Status"
									name="order_status"
									options={STATUS_OPTIONS}
									onChange={(e) => {
										setFilters((prev) => ({ ...prev, status: e, page: 1 }));
									}}
									value={filters.status}
									isClearable
								/>

							</div>
						</div>
					</div>
				</div>

				<div className={styles.table_container}>
					{!isEmpty(list) ? <Table columns={columns} data={list || []} loading={loading} /> : <EmptyState />}
				</div>

				{total_count >= MAX_LIMIT && !isEmpty(list) ?	(
					<div className={styles.pagination}>
						<Pagination
							type="table"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={onPageChange}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default FinanceTable;
