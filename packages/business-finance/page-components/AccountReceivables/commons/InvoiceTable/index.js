import { cl, Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import Filters from '../../../commons/Filters/index.tsx';
import completedColumn from '../../configs/Completed_table.tsx';
import useBulkIrnGenerate from '../../hooks/useBulkIrnGenerate.ts';
import useGetOutstandingCard from '../../hooks/useGetoutstandingCard.ts';
import { INVOICE_FILTER } from '../../Utils/invoicelistFilter.ts';
import FilterPopover from '../FilterPopover';
import FooterCard from '../FooterCard';
import SearchInput from '../searchInput/index.tsx';
import StyledTable from '../styledTable/index.tsx';

import styles from './styles.module.css';

const ORANGE = '#F68B21';
const GREY = '#BDBDBD';

const SEARCH_PLACEHOLDER = 'Search by Invoice number / SID';

const getStyle = ({
	sortType = '',
	sortBy = '',
	activeSortType = '',
	activeSortBy = '',
}) => (sortType === activeSortType && sortBy === activeSortBy ? ORANGE : GREY);

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

	const sortStyleGrandTotalAsc = getStyle({
		sortType,
		sortBy,
		activeSortType : 'asc',
		activeSortBy   : 'grandTotal',
	});

	const sortStyleGrandTotalDesc = getStyle({
		sortType,
		sortBy,
		activeSortType : 'desc',
		activeSortBy   : 'grandTotal',
	});

	const sortStyleInvoiceDateAsc = getStyle({
		sortType,
		sortBy,
		activeSortType : 'asc',
		activeSortBy   : 'invoiceDate',
	});

	const sortStyleInvoiceDateDesc = getStyle({
		sortType,
		sortBy,
		activeSortType : 'desc',
		activeSortBy   : 'invoiceDate',
	});

	const sortStyleDueDateAsc = getStyle({
		sortType,
		sortBy,
		activeSortType : 'asc',
		activeSortBy   : 'dueDate',
	});

	const sortStyleDueDateDesc = getStyle({
		sortType,
		sortBy,
		activeSortType : 'desc',
		activeSortBy   : 'dueDate',
	});

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
		showFilters,
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
							placeholder={SEARCH_PLACEHOLDER}
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
						placeholder={SEARCH_PLACEHOLDER}
					/>
				</div>
			)}
			<div className={styles.table}>
				<StyledTable
					data={invoiceList}
					columns={columnsFiltered}
					loading={invoiceLoading}
				/>
			</div>
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
