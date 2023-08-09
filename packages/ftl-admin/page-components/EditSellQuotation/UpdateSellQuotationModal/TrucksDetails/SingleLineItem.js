import { cl, InputNumber, Select } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

const TO_FIXED_AMT_VALUE = 2;

const DEFAULT_OPTIONS_MAPPING = {
	BAS         : ['STC', 'GSTC', 'BAS'],
	FSC         : ['FSC'],
	BookingCONV : ['BookingCONV'],
	STC         : ['STC', 'GSTC', 'BAS'],
	GSTC        : ['STC', 'GSTC', 'BAS'],
};

const getOptions = (code, options, serviceType) => {
	if (serviceType !== 'ftl_freight_service') {
		return options;
	}
	if (code in DEFAULT_OPTIONS_MAPPING) {
		const filterOptions = options.filter(
			(item) => DEFAULT_OPTIONS_MAPPING[code].includes(item?.value),
		);
		return filterOptions;
	}
	return options;
};

function SingleLineItem(props) {
	const {
		item = {},
		updateRateQuantity = {},
		setUpdateRateQuantity = () => {},
		truckDetailsdata = {},
		chargeOptions = [],
		index = 0,
	} = props;
	const initCode = updateRateQuantity[`${truckDetailsdata?.service_id}_${index}`]?.code;

	const [code, setCode] = useState(initCode);

	const {
		alias = '', currency = ' ', discount_price = 0, tax_price_discounted = 0,
		tax_percent = 0, exchange_rate = 0, tax_total_price_discounted = 0, price_discounted = 0, quantity = 0,
	} = item || {};

	const handleCodeChange = (value) => {
		const charge = chargeOptions.find((chg) => value === chg?.value) || {};

		setUpdateRateQuantity((prev) => {
			const initKey = `${truckDetailsdata?.service_id}_${index}`;
			const initValue = prev?.[initKey] || {};
			initValue.code = value;
			initValue.name = charge.name;
			const copyObj = { ...(prev || {}) };
			copyObj[initKey] = initValue;

			return copyObj;
		});
		setCode(value);
	};

	const handleUpdateValues = (value, attribute) => {
		setUpdateRateQuantity((prev) => {
			const toKey = `${truckDetailsdata?.service_id}_${index}`;
			return {
				...(prev || {}),
				[toKey]: { ...(prev?.[toKey] || {}), [attribute]: value },
			};
		});
	};

	return (
		<div>
			<div className={cl`${styles.row} ${styles.heading_row}`}>
				<div className={styles.col}>
					<Select
						options={getOptions(code, chargeOptions, truckDetailsdata?.service_type)}
						size="sm"
						value={code}
						onChange={(e) => handleCodeChange(e)}
						style={{ width: '200px' }}
					/>
				</div>
				<div className={styles.col}>{alias}</div>
				<div className={styles.col}>{currency}</div>
				<div className={styles.col}>
					<InputNumber
						value={updateRateQuantity[`${truckDetailsdata?.service_id}_${index}`]?.updated_rate}
						min={price_discounted}
						onChange={(e) => handleUpdateValues(e, 'updated_rate')}
						size="sm"
						required
					/>
				</div>
				<div className={cl`${styles.col} ${styles.alias_col}`}>
					<InputNumber
						value={updateRateQuantity[`${truckDetailsdata?.service_id}_${index}`]?.updated_quantity}
						min={quantity}
						onChange={(e) => handleUpdateValues(e, 'updated_quantity')}
						size="sm"
						required
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
	);
}

export default SingleLineItem;
