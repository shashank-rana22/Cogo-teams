import { Pagination, Button } from '@cogoport/components';
import React from 'react';

import Filters from '../../../../../commons/Filters';
import FilterModal from '../../../../commons/FilterModal';
import SearchInput from '../../../../commons/searchInput';
import StyledTable from '../../../../commons/styledTable';
import completedColumn from '../../../../configs/Completed_table';
import useGetOutstandingCard from '../../../../hooks/useGetoutstandingCard';
import { INVOICE_LIST_FILTERS } from '../../../../Utils/invoicelistFilter';

import styles from './styles.module.css';

function InvoiceTable({ data }) {
	const { organizationId = '' } = data || {};

	const {
		listData,
		clearInvoiceFilters,
		invoiceFilters,
		invoiceLoading,
		setinvoiceFilters,
		getOrganizationInvoices,
	} = useGetOutstandingCard(organizationId);

	const { list : invoiceList = [], page: pageInvoiceList, totalRecords: recordInvoiceList } = listData || {};

	console.log('invoiceData', listData);

	const columns = completedColumn(getOrganizationInvoices);
	return (
		<div>
			{' '}
			<div
				className={styles.filter_container}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>

					<Filters
						filters={invoiceFilters}
						setFilters={setinvoiceFilters}
						controls={INVOICE_LIST_FILTERS}
					/>

					<FilterModal
						setFilters={setinvoiceFilters}
						filters={invoiceFilters}
						clearFilter={clearInvoiceFilters}
					/>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div style={{ display: 'flex', marginRight: '20px', alignItems: 'center' }}>
						<Button
							size="sm"
							style={{ marginRight: '8px' }}
							// onClick={sendReport}
						>
							send Report

						</Button>

					</div>
					<SearchInput
						value={invoiceFilters.search || ''}
						onChange={(value) => setinvoiceFilters({
							...invoiceFilters,
							search: value || undefined,
						})}
						size="md"
						placeholder="Search by Customer Name /Invoice number /SID"
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
