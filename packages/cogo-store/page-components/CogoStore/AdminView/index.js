import React from 'react';

import useGetOrderDates from '../../../hooks/useGetOrderDates';
import useGetProductFilterDetail from '../../../hooks/useGetProductFilterDetail';
import useListAllOrders from '../../../hooks/useListAllOrders';
import Header from '../Header';

import OrderTable from './OrderTable';
import OverView from './OverView';
import styles from './styles.module.css';

function AdminView() {
	const { data: dateArray } = useGetOrderDates();
	const { data, filters, setFilters, refetch, loading } =	 useListAllOrders({ dateArray });
	const { data : productData } = useGetProductFilterDetail();

	return (
		<div className={styles.container}>
			<Header productData={productData} />
			<div className={styles.sub_container}>
				<OverView data={data} refetch={refetch} />
				<OrderTable
					data={data}
					filters={filters}
					setFilters={setFilters}
					dateArray={dateArray}
					refetch={refetch}
					loading={loading}
				/>
			</div>
		</div>
	);
}

export default AdminView;
