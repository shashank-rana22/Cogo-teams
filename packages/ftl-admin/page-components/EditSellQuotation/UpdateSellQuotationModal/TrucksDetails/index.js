import { cl, InputNumber, Toast } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function TruckDetails({ truckDetailsdata = {}, updateRateQuantity = {}, setUpdateRateQuantity = () => {} }) {
	const { line_items = [], truck_number = '' } = truckDetailsdata;

	return (
		<div className={styles.truck_detals}>
			<div className={cl`${styles.row} ${styles.heading_row}`}>
				<div className={styles.col}>

					<span>
						Truck Number
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

			{line_items.map((item) => (
				<div key={item.service_id}>
					<div className={styles.row}>
						<div className={styles.col}>{item.name}</div>

						<div className={styles.col}>
							{item.alias}
						</div>

						<div className={styles.col}>
							{item.currency}
						</div>

						<div className={styles.col}>
							<InputNumber
								value={updateRateQuantity[`${truckDetailsdata?.service_id}_${item.code}_rate`]
								|| item?.price_discounted}
								onChange={(e) => {
									if (+e < item.price_discounted) {
										Toast.error('Rate Cannot be less than current rate');
										return;
									}
									setUpdateRateQuantity((prev) => ({
										...prev,
										[`${truckDetailsdata?.service_id}_${item.code}_rate`]: e,
									}));
								}}
							/>
						</div>

						<div className={cl`${styles.col} ${styles.alias_col}`}>
							<InputNumber
								value={updateRateQuantity[`${truckDetailsdata?.service_id}_${item.code}_quantity`]
							|| item.quantity}
								onChange={(e) => {
									if (+e < item.quantity) {
										Toast.error('Quantity Cannot be less than current rate');
										return;
									}
									setUpdateRateQuantity((prev) => ({
										...prev,
										[`${truckDetailsdata?.service_id}_${item.code}_quantity`]: e,
									}));
								}}
							/>
						</div>

						<div className={styles.col}>
							{item.discount_price}
							(
							{`${item.tax_percent} %`}
							)
						</div>
						<div className={styles.col}>{item.exchange_rate}</div>
						<div className={styles.col}>{item.tax_total_price_discounted}</div>
						<div className={styles.col}>{item.tax_total_price_discounted}</div>
					</div>
					<div className={styles.line_item_divider} />
				</div>
			))}

		</div>
	);
}

export default TruckDetails;
