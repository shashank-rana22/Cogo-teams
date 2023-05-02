import { Pagination, Button } from '@cogoport/components';
import React from 'react';

import Filters from '../../../commons/Filters';
import completedColumn from '../../configs/Completed_table';
import useGetOutstandingCard from '../../hooks/useGetoutstandingCard';
import { INVOICE_LIST_FILTERS } from '../../Utils/invoicelistFilter';
import FilterModal from '../FilterModal';
import SearchInput from '../searchInput';
import StyledTable from '../styledTable';

import styles from './styles.module.css';

interface Props {
	organizationId: string,
	entityCode?: string,
	showName?: boolean
}

function InvoiceTable({ organizationId, entityCode, showName }: Props) {
	const {
		listData,
		clearInvoiceFilters,
		invoiceFilters,
		invoiceLoading,
		setinvoiceFilters,
		getOrganizationInvoices,
		sendReport,
	} = useGetOutstandingCard(organizationId, entityCode);

	const { list : invoiceList = [], page: pageInvoiceList, totalRecords: recordInvoiceList } = listData || {};

	const columns = completedColumn(getOrganizationInvoices, showName);
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
							size="md"
							style={{ marginRight: '8px' }}
							onClick={() => { sendReport(); }}
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
