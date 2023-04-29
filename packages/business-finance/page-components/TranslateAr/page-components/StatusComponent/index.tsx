import { Pagination } from '@cogoport/components';
import React from 'react';

import EmptyStateDocs from '../../../commons/EmptyStateDocs';
import Filters from '../../common/Filters';
import { StatusObject } from '../../common/interfaces';
import useGetShipmentInvoices from '../../hooks/useGetShipmentInvoices';
import getColumns from '../../utils/getColumns';
import StyledTable from '../Table';

import styles from './styles.module.css';

function StatusComponent({ status }: StatusObject) {
	const {
		invoiceLoading, invoiceData, setShipmentFilters,
		shipmentFilters, refetch,
	} = useGetShipmentInvoices({ status });

	const { list = [], pageIndex = 0, totalRecords = 0, pageLimit = 10 } = invoiceData || {};

	const columns = getColumns(status, refetch);

	return (
		<>
			<Filters onChangeFilters={setShipmentFilters} filters={shipmentFilters} />
			<StyledTable data={list} columns={columns} loading={invoiceLoading} />
			{list.length === 0 && !invoiceLoading && <EmptyStateDocs />}
			<div className={styles.pagination_container}>
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
