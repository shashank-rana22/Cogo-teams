import React from 'react';

import useGetOrderDates from '../../../hooks/useGetOrderDates';
import useListAllOrders from '../../../hooks/useListAllOrders';
import Header from '../Header';

import OrderTable from './OrderTable';
import OverView from './OverView';
import styles from './styles.module.css';

function AdminView() {
	const { data: dateArray } = useGetOrderDates();
	const { data, filters, setFilters, refetch } = useListAllOrders({ dateArray });

	return (
		<div className={styles.container}>
			<Header />
			<OverView data={data} refetch={refetch} />
			<OrderTable data={data} filters={filters} setFilters={setFilters} dateArray={dateArray} refetch={refetch} />
		</div>
	);
}

export default AdminView;
