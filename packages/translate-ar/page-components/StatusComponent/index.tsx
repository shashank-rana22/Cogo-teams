import { Pagination } from '@cogoport/components';
import React from 'react';

import Filters from '../../common/Filters';
import completedColumn from '../../configs/completed-table';
import pendingColumns from '../../configs/pending-table';
import useGetShipmentInvoices from '../../hooks/useGetShipmentInvoices';
import StyledTable from '../Table';

import styles from './styles.module.css';

function StatusComponent({ status }: { status: string }) {
	const {
		invoiceLoading, invoiceData, setShipmentFilters,
		shipmentFilters, refetch,
	} = useGetShipmentInvoices({ status });

	const { list = [], pageIndex = 0, totalRecords = 0, pageLimit = 10 } = invoiceData || {};

	const columns = status === 'completed' ? completedColumn : pendingColumns(refetch);

	return (
		<>
			<Filters />
			<StyledTable data={list} columns={columns} loading={invoiceLoading} />
			<div className={styles.pagination_container} id="rnp_role">
				<Pagination
					type="table"
					currentPage={pageIndex}
					totalItems={totalRecords}
					pageSize={pageLimit}
					onPageChange={(val) => setShipmentFilters({ ...shipmentFilters, page: val })}
				/>
			</div>
		</>
	);
}

export default StatusComponent;
