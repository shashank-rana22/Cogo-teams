import React from 'react';

import useGetControlledBooking from '../../../hooks/useGetControlledBooking';

import Header from './Header';
import ListComponent from './ListComponent';
import styles from './styles.module.css';

function DeskView() {
	const { data, loading, filters, setFilters, listControlledBooking:refetchBookingList } = useGetControlledBooking();

	return (
		<div className={styles.container}>

			<Header filters={filters} setFilters={setFilters} />

			<ListComponent
				data={data}
				loading={loading}
				filters={filters}
				setFilters={setFilters}
				refetchBookingList={refetchBookingList}
			/>

		</div>
	);
}

export default DeskView;
