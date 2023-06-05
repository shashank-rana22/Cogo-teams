import { Button, Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import Filters from '../../../commons/Filters';
import completedColumn from '../../configs/Completed_table';
import useGetOutstandingCard from '../../hooks/useGetoutstandingCard';
import { INVOICE_FILTER } from '../../Utils/invoicelistFilter';
import FilterModal from '../FilterModal';
import SearchInput from '../searchInput';
import StyledTable from '../styledTable';

import styles from './styles.module.css';

interface Props {
	organizationId: string,
	entityCode?: string,
	showName?: boolean
}

const ORANGE = '#F68B21';
const GREY = '#BDBDBD';

function InvoiceTable({ organizationId, entityCode, showName }: Props) {
	const [checkedRows, setCheckedRows] = useState([]);
	console.log('checkedRows->', checkedRows);

	const {
		listData,
		clearInvoiceFilters,
		invoiceFilters,
		invoiceLoading,
		setinvoiceFilters,
		getOrganizationInvoices,
		sendReport,
		sort,
		setSort,
	} = useGetOutstandingCard(organizationId, entityCode);

	const { list : invoiceList = [], page: pageInvoiceList, totalRecords: recordInvoiceList } = listData || {};

	const { sortType = '', sortBy = '' } = sort || {};

	const sortStyleGrandTotalAsc = sortType === 'asc' && sortBy === 'grandTotal' ? ORANGE : GREY;

	const sortStyleGrandTotalDesc = sortType === 'desc' && sortBy === 'grandTotal' ? ORANGE : GREY;

	const sortStyleInvoiceDateAsc = sortType === 'asc' && sortBy === 'invoiceDate' ? ORANGE : GREY;

	const sortStyleInvoiceDateDesc = sortType === 'desc' && sortBy === 'invoiceDate' ? ORANGE : GREY;

	const sortStyleDueDateAsc = sortType === 'asc' && sortBy === 'dueDate' ? ORANGE : GREY;

	const sortStyleDueDateDesc = sortType === 'desc' && sortBy === 'dueDate' ? ORANGE : GREY;

	const columns = completedColumn({
		refetch   : getOrganizationInvoices,
		showName,
		setSort,
		sortStyleGrandTotalAsc,
		sortStyleGrandTotalDesc,
		sortStyleInvoiceDateAsc,
		sortStyleInvoiceDateDesc,
		sortStyleDueDateAsc,
		sortStyleDueDateDesc,
		invoiceFilters,
		setinvoiceFilters,
		checkedRows,
		setCheckedRows,
		totalRows : listData?.list || [],
	});

	console.log('checked rows->', checkedRows);

	return (
		<div>
			{' '}
			<div
				className={styles.filter_container}
			>
				<div
					className={styles.filter_div}
				>

					<Filters
						filters={invoiceFilters}
						setFilters={setinvoiceFilters}
						controls={INVOICE_FILTER()}
					/>

					<FilterModal
						setFilters={setinvoiceFilters}
						filters={invoiceFilters}
						clearFilter={clearInvoiceFilters}
					/>
				</div>
				<div className={styles.filter_container}>

					{checkedRows?.length > 0 ? (
						<Button style={{ marginRight: '20px' }}>
							Bulk IRN Generate
						</Button>
					) : null}
					<div
						className={styles.send_report}
						onClick={() => { sendReport(); }}
						role="presentation"
					>
						Send Report

					</div>

					<SearchInput
						value={invoiceFilters.search || ''}
						onChange={(value) => setinvoiceFilters({
							...invoiceFilters,
							search: value || undefined,
						})}
						size="md"
						placeholder="Search by /Invoice number /SID"
					/>
				</div>
			</div>

			<StyledTable data={invoiceList} columns={columns} loading={invoiceLoading} />
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={pageInvoiceList}
					totalItems={recordInvoiceList}
					pageSize={invoiceFilters.pageLimit}
					onPageChange={(val) => setinvoiceFilters({ ...invoiceFilters, page: val })}
				/>

			</div>

		</div>
	);
}

export default InvoiceTable;
