import { cl } from '@cogoport/components';
import React from 'react';

import { POCDetailsFields } from '../../../configurations/poc-details';

import POCDetailsItem from './POCDetailsItem';
import styles from './styles.module.css';

type TypeObject = string | Array<object> | object[] | React.FC ;
interface NestedObj {
	[key: string]: TypeObject;
}

interface POCDetailsProps {
	data: NestedObj;
}

function POCDetails({ data }:POCDetailsProps) {
	const { fields } = POCDetailsFields;

	const {
		e_booking_availability: eBooking,
		inventory_stock_availability: availability, pocs_data:pocsData,
	} = data || {};

	const functions = {
		handleContact: (singleItem) => (
			<div>
				{singleItem.mobile_country_code}
				{' '}
				{singleItem.mobile_number}
			</div>
		),
	};

	return (
		<div className={styles.poc_detail_container}>
			<div className={styles.poc_container}>
				<div className={styles.basic_info}>
					<div className={styles.basic_info_heading}>
						E-Booking
						<span>:</span>
					</div>
					{eBooking === 'available' ? 'Yes' : 'No'}
					<div className={cl`${styles.basic_info_heading} ${styles.inventory}`}>
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
							functions={functions}
							key={JSON.stringify(item)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default POCDetails;
