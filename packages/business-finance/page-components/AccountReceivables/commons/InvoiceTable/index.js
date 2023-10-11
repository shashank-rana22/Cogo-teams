import { cl, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import Filters from '../../../commons/Filters/index.tsx';
import completedColumn from '../../configs/Completed_table.tsx';
import useBulkIrnGenerate from '../../hooks/useBulkIrnGenerate.ts';
import useGetOutstandingCard from '../../hooks/useGetoutstandingCard.ts';
import { invoiceFilter } from '../../Utils/invoicelistFilter.ts';
import FilterPopover from '../FilterPopover';
import FooterCard from '../FooterCard';
import SearchInput from '../searchInput/index.tsx';
import StyledTable from '../styledTable/index.tsx';

import styles from './styles.module.css';

const ORANGE = '#F68B21';
const GREY = '#BDBDBD';

const USER_IDS = [
	GLOBAL_CONSTANTS.uuid.vinod_talapa_user_id,
	GLOBAL_CONSTANTS.uuid.hk_user_id,
	GLOBAL_CONSTANTS.uuid.abhishek_kumar_user_id];

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
	const { profile } = useSelector((state) => state);
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

	const sortStyleLedgerTotalAsc = getStyle({
		sortType,
		sortBy,
		activeSortType : 'asc',
		activeSortBy   : 'ledgerTotal',
	});

	const sortStyleLedgerTotalDesc = getStyle({
		sortType,
		sortBy,
		activeSortType : 'desc',
		activeSortBy   : 'ledgerTotal',
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
		sortStyleLedgerTotalAsc,
		sortStyleLedgerTotalDesc,
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
							controls={invoiceFilter({ profile })}
						/>
						<FilterPopover
							filters={invoiceFilters}
							setFilters={setinvoiceFilters}
							clearFilter={clearInvoiceFilters}
							refetch={getOrganizationInvoices}
						/>
					</div>
					<div className={styles.filter_container}>
						{(USER_IDS.includes(profile?.user?.id)) ? (
							<div
								className={styles.send_report}
								onClick={() => {
									sendReport();
								}}
								role="presentation"
							>
								Send Report
							</div>
						) : null}

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
			{recordInvoiceList >= invoiceFilters.pageLimit
				? (
					<div className={cl`${styles.pagination_container} ${showFilters ? '' : styles.nomargin}`}>
						<Pagination
							type="table"
							currentPage={pageInvoiceList}
							totalItems={recordInvoiceList}
							pageSize={invoiceFilters.pageLimit}
							onPageChange={(val) => setinvoiceFilters({ ...invoiceFilters, page: val })}
						/>
					</div>
				)
				: null}
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
