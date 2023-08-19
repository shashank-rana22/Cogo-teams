import { cl, Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import Filters from '../../../commons/Filters/index.tsx';
import completedColumn from '../../configs/Completed_table.tsx';
import useBulkIrnGenerate from '../../hooks/useBulkIrnGenerate.ts';
import useGetOutstandingCard from '../../hooks/useGetoutstandingCard.ts';
import { INVOICE_FILTER } from '../../Utils/invoicelistFilter.ts';
import FilterPopover from '../FilterPopover/index.tsx';
import FooterCard from '../FooterCard';
import SearchInput from '../searchInput/index.tsx';
import StyledTable from '../styledTable/index.tsx';

import styles from './styles.module.css';

const ORANGE = '#F68B21';
const GREY = '#BDBDBD';

function InvoiceTable({
	organizationId = '',
	entityCode = '',
	showName = false,
	showFilters = true,
	limit = 10,
}) {
	const [checkedRows, setCheckedRows] = useState([]);
	const [isHeaderChecked, setIsHeaderChecked] = useState(false);

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
	} = useGetOutstandingCard({ organizationId, entityCode, limit });

	const { bulkIrnGenerate, bulkIrnLoading } = useBulkIrnGenerate({
		entityCode,
		getOrganizationInvoices,
		checkedRows,
		setCheckedRows,
		setIsHeaderChecked,
	});

	const {
		list: invoiceList = [],
		page: pageInvoiceList,
		totalRecords: recordInvoiceList,
	} = listData || {};

	const { sortType = '', sortBy = '' } = sort || {};

	const sortStyleGrandTotalAsc = sortType === 'asc' && sortBy === 'grandTotal' ? ORANGE : GREY;

	const sortStyleGrandTotalDesc = sortType === 'desc' && sortBy === 'grandTotal' ? ORANGE : GREY;

	const sortStyleInvoiceDateAsc = sortType === 'asc' && sortBy === 'invoiceDate' ? ORANGE : GREY;

	const sortStyleInvoiceDateDesc = sortType === 'desc' && sortBy === 'invoiceDate' ? ORANGE : GREY;

	const sortStyleDueDateAsc = sortType === 'asc' && sortBy === 'dueDate' ? ORANGE : GREY;

	const sortStyleDueDateDesc = sortType === 'desc' && sortBy === 'dueDate' ? ORANGE : GREY;

	const columns = completedColumn({
		entityCode,
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
		isHeaderChecked,
		setIsHeaderChecked,
	});

	const columnsFiltered = showFilters
		? columns
		: columns?.filter((column) => column.id !== 'checkbox');

	return (
		<div>
			{showFilters ? (
				<div className={styles.filter_container}>
					<div className={styles.filter_div}>
						<Filters
							filters={invoiceFilters}
							setFilters={setinvoiceFilters}
							controls={INVOICE_FILTER()}
						/>
						<FilterPopover
							filters={invoiceFilters}
							setFilters={setinvoiceFilters}
							clearFilter={clearInvoiceFilters}
							refetch={getOrganizationInvoices}
						/>
					</div>
					<div className={styles.filter_container}>
						<div
							className={styles.send_report}
							onClick={() => {
								sendReport();
							}}
							role="presentation"
						>
							Send Report
						</div>

						<SearchInput
							value={invoiceFilters.search || ''}
							onChange={(value) => setinvoiceFilters({
								...invoiceFilters,
								search : value || undefined,
								page   : 1,
							})}
							size="md"
							placeholder="Search by /Invoice number /SID"
						/>
					</div>
				</div>
			) : (
				<div className={styles.inputstyles}>
					<SearchInput
						value={invoiceFilters.search || ''}
						onChange={(value) => setinvoiceFilters({
							...invoiceFilters,
							search : value || undefined,
							page   : 1,
						})}
						size="md"
						placeholder="Search by /Invoice number /SID"
					/>
				</div>
			)}
			<StyledTable
				data={invoiceList}
				columns={columnsFiltered}
				loading={invoiceLoading}
			/>
			<div className={cl`${styles.pagination_container} ${showFilters ? '' : styles.nomargin}`}>
				<Pagination
					type="table"
					currentPage={pageInvoiceList}
					totalItems={recordInvoiceList}
					pageSize={invoiceFilters.pageLimit}
					onPageChange={(val) => setinvoiceFilters({ ...invoiceFilters, page: val })}
				/>
			</div>
			{showFilters ? (
				<FooterCard
					entityCode={entityCode}
					bulkIrnGenerate={bulkIrnGenerate}
					bulkIrnLoading={bulkIrnLoading}
					checkedRows={checkedRows}
				/>
			) : null}
		</div>
	);
}

export default InvoiceTable;
