import React, { useState } from 'react';

import useListShipments from '../../hooks/bookingDeskHooks/useGetList';

import Body from './Body';
import Header from './Header';
import styles from './styles.module.css';

function BookingDesk() {
	const [activeTab, setActiveTab] = useState('place_booking');

	const {
		loading,
		filters,
		page,
		hookSetters,
		list: { total, data = {} },
	} = useListShipments();

	return (
		<div className={styles.container}>
			<Header
				hookSetters={hookSetters}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>

			<Body
				loading={loading}
				data={data}
				total={total}
				page={page}
				hookSetters={hookSetters}
				filters={filters}
			/>
		</div>
	);
}
export default BookingDesk;
