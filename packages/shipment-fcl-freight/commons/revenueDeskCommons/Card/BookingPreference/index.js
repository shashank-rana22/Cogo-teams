import { Loader } from '@cogoport/components';
import React from 'react';

import EmptyState from '../../../EmptyState';

import Item from './Item';
import styles from './styles.module.css';

function BookingPreference({ loading = false, bookingData = [] }) {
	if (loading) {
		return (
			<div className={styles.loader_container}>
				<Loader />
			</div>
		);
	}

	if (!loading && bookingData?.length === 0) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>
			{bookingData?.map((booking_item, idx) => (
				<Item
					bookingItem={booking_item}
					idx={idx}
					isLast={(bookingData?.length || 0) - 1 === idx}
				/>
			))}
		</div>
	);
}

export default BookingPreference;
