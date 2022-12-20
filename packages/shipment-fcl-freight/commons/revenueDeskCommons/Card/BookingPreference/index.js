import React from 'react';
import Item from './Item';
import EmptyState from '../../../EmptyState';
import { Loader } from '@cogoport/components';
import styles from './styles.module.css';


const BookingPreference = ({ loading = false, bookingData = [] }) => {
	
	if (loading) {
		return (
			<div className={styles.loaderContainer}>
				<Loader/>
			</div>
		);
	}

	if (!loading && bookingData?.length === 0) {
		return <EmptyState />;
	}

	return (
		<div className = {styles.container}>
			{bookingData?.map((booking_item, idx) => (
				<Item
					bookingItem={booking_item}
					idx={idx}
					isLast={bookingData?.length - 1 === idx}
				/>
			))}
		</div>
	);
};

export default BookingPreference;