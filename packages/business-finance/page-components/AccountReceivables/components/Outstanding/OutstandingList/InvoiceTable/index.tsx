import { Pagination, Button } from '@cogoport/components';
import React from 'react';

import Filters from '../../../../../commons/Filters';
import FilterModal from '../../../../commons/FilterModal';
import { GenericObject } from '../../../../commons/Interfaces';
import SearchInput from '../../../../commons/searchInput';
import StyledTable from '../../../../commons/styledTable';
import completedColumn from '../../../../configs/Completed_table';
import useGetOutstandingCard from '../../../../hooks/useGetoutstandingCard';
import { INVOICE_LIST_FILTERS } from '../../../../Utils/invoicelistFilter';

import styles from './styles.module.css';

interface Props {
	organizationId: string,
	outStandingFilters?: GenericObject
}

function InvoiceTable({ organizationId, outStandingFilters }: Props) {
	const { entityCode = '' } = outStandingFilters || {};
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
