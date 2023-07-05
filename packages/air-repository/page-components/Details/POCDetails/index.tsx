import React from 'react';

import { POCDetailsFields } from '../../../configurations/poc-details';

import POCDetailsItem from './POCDetailsItem';
import styles from './styles.module.css';

function POCDetails({ data }) {
	const { fields } = POCDetailsFields;

	const {
		e_booking_availability: eBooking,
		inventory_stock_availability: availability, pocs_data:pocsData,
	} = data || {};

	return (
		<div className={styles.poc_detail_container}>
			<div className={styles.poc_container}>
				<div className={styles.basic_info}>
					<div className={styles.basic_info_heading}>
						E-Booking
						<span>:</span>
					</div>
					{eBooking === 'available' ? 'Yes' : 'No'}
					<div className={`${styles.basic_info_heading} ${styles.inventory}`}>
						Inventory
						<span>:</span>
					</div>
					{availability === 'before_booking' ? 'Before' : 'After'}
				</div>
				<div className={styles.poc_list}>
					<header className={styles.header}>
						{fields.map((field) => (
							<div
								className={styles.col}
								style={{ '--span': field.span || 1 } as React.CSSProperties}
								key={field.key}
							>
								{ field.label }
							</div>
						))}
					</header>
					{(pocsData || []).map((item) => (
						<POCDetailsItem
							item={item}
							fields={fields}
							key={JSON.stringify(item)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default POCDetails;
