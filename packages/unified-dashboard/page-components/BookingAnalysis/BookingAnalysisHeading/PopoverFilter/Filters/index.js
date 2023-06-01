import { CheckboxGroup, Checkbox, Button } from '@cogoport/components';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { serviceTypeArr, tradeTypeArr } from '../../../../../constants/checkbox-data';
import { trade, shipment } from '../../../../../constants/filter-data';

import styles from './styles.module.css';

function Filters({
	closePopover = () => {},
	setParams,
	params = {},

}) {
	const { shipment_type, trade_type } = params;

	const [selectAll, setSelectAll] = useState(true);
	const [errorMsg, setErrorMsg] = useState('');
	const [tradeCheck, setTradeCheck] = useState(trade_type);
	const [serviceCheck, setServiceCheck] = useState(shipment_type);

	const getCheckBoxValues = (arr) => arr.map((val) => val.value);

	const onSelectAll = (e) => {
		setSelectAll(e.target.checked);
		if (e.target.checked) {
			setServiceCheck(getCheckBoxValues(serviceTypeArr));
			setTradeCheck(getCheckBoxValues(tradeTypeArr));
			setErrorMsg('');
		} else {
			setServiceCheck([]);
			setTradeCheck([]);
			setErrorMsg('Please Select Filter');
		}
	};

	const onChangeCheckbox = (data, key) => {
		setSelectAll(false);
		if (key === 'shipment_type') {
			setServiceCheck(data);
			setErrorMsg('');
		} else {
			setTradeCheck(data);
			setErrorMsg('');
		}
	};

	const handleClick = () => {
		if (serviceCheck.length >= 1 || tradeCheck.length >= 1) {
			setParams((prev) => ({
				...prev,
				shipment_type : serviceCheck,
				trade_type    : tradeCheck,

			}));
		} else {
			setErrorMsg('Please Select Filter');
		}
	};

	const onApply = () => {
		if (errorMsg === '') {
			handleClick();
			closePopover();
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.filter}>
				<div className={styles.detail_text}>
					Filter Details
				</div>
				<div className={styles.flex_container}>
					<Checkbox
						label="Select All"
						checked={selectAll}
						onChange={(e) => onSelectAll(e)}
						value={selectAll}
					/>
				</div>
			</div>
			<div className={styles.border} />

			<div className={styles.checkbox_wrapper}>
				<div className={styles.trade}>
					<div className={styles.text_trade}>
						Trade Type
					</div>
					<div className={styles.check_trade}>
						{trade.map((item) => (
							<CheckboxGroup
								key={uuidv4()}
								className={styles.trade_checkbox}
								options={item.options}
								onChange={(e) => onChangeCheckbox(e, 'trade_type')}
								value={tradeCheck}
							/>
						))}
					</div>
				</div>
				<div className={styles.shipment}>
					<div className={styles.text_shipment}>
						Service Type
					</div>
					<div className={styles.check_shipment}>
						{shipment.map((item) => (
							<CheckboxGroup
								key={uuidv4()}
								className={styles.shipment_checkbox}
								options={item.options}
								onChange={(e) => onChangeCheckbox(e, 'shipment_type')}
								value={serviceCheck}
							/>
						))}
					</div>
				</div>

				<div className={styles.text_error}>
					{errorMsg}
				</div>
			</div>

			<div className={styles.flex_apply}>
				<Button themeType="accent" onClick={onApply}>
					Apply
				</Button>
			</div>
		</div>
	);
}

export default Filters;
