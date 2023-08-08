import { cl } from '@cogoport/components';
import React from 'react';

import SingleLineItem from './SingleLineItem';
import styles from './styles.module.css';

function TruckDetails({
	truckDetailsdata = {},
	updateRateQuantity = {},
	setUpdateRateQuantity = () => {},
	chargesList = [],
}) {
	const { line_items = [], truck_number = '' } = truckDetailsdata;

	const chargeOptions = chargesList?.map(
		(item) => ({
			label : `${item?.code} - ${item?.name}`,
			value : item?.code,
			...(item || {}),
		}),
	);

	return (
		<div className={styles.truck_detals}>
			<div className={cl`${styles.row} ${styles.heading_row}`}>
				<div className={styles.col}>

					<span>
						{truck_number ? 'Truck Number' : 'Charges'}
					</span>
					{' '}
					<span style={{ color: '#000000' }}>
						{truck_number}
					</span>

				</div>

				<div className={styles.col}>
					Alias Name
				</div>

				<div className={styles.col}>
					Currency
				</div>

				<div className={styles.col}>
					Rate
				</div>
				<div className={cl`${styles.col} ${styles.alias_col}`}>
					Quantity
				</div>

				<div className={styles.col}>
					Discount
				</div>
				<div className={styles.col}>
					Exc. Rate
				</div>
				<div className={styles.col}>
					Tax Amt
				</div>
				<div className={styles.col}>
					Amt With Tax
				</div>
			</div>

			<div className={styles.line}> </div>

			{line_items.map((item, index) => (
				<SingleLineItem
					item={item}
					key={item?.code}
					truckDetailsdata={truckDetailsdata}
					updateRateQuantity={updateRateQuantity}
					setUpdateRateQuantity={setUpdateRateQuantity}
					chargeOptions={chargeOptions}
					index={index}
				/>
			))}

		</div>
	);
}

export default TruckDetails;
