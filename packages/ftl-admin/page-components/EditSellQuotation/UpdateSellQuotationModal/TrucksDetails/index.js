import { cl, InputNumber } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const TO_FIXED_AMT_VALUE = 2;

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

			{line_items.map(({
				code = '', name = '', alias = '', currency = ' ', discount_price = 0, tax_price_discounted = 0,
				tax_percent = 0, exchange_rate = 0, tax_total_price_discounted = 0,
			}) => (
				<div key={code}>
					<div className={styles.row}>
						<div className={styles.col}>{name}</div>
						<div className={styles.col}>{alias}</div>
						<div className={styles.col}>{currency}</div>
						<div className={styles.col}>
							<InputNumber
								value={updateRateQuantity[`${truckDetailsdata?.service_id}_${code}_rate`]}
								onChange={(e) => {
									setUpdateRateQuantity((prev) => ({
										...prev,
										[`${truckDetailsdata?.service_id}_${code}_rate`]: e,
									}));
								}}
							/>
						</div>
						<div className={cl`${styles.col} ${styles.alias_col}`}>
							<InputNumber
								value={updateRateQuantity[`${truckDetailsdata?.service_id}_${code}_quantity`]}
								onChange={(e) => {
									setUpdateRateQuantity((prev) => ({
										...prev,
										[`${truckDetailsdata?.service_id}_${code}_quantity`]: e,
									}));
								}}
							/>
						</div>
						<div className={styles.col}>
							{discount_price}
						</div>
						<div className={styles.col}>{exchange_rate}</div>
						<div className={styles.col}>
							{tax_price_discounted.toFixed(TO_FIXED_AMT_VALUE)}
							(
							{`${tax_percent} %`}
							)
						</div>
						<div className={styles.col}>{tax_total_price_discounted.toFixed(TO_FIXED_AMT_VALUE)}</div>
					</div>
					<div className={styles.line_item_divider} />
				</div>
			))}

		</div>
	);
}

export default TruckDetails;
