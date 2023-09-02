import { Radio } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function SelectRadio({
	itemData = {},
	selectedBankId = null,
	checkedRow = {},
	selectedPayrun = {},
	setSelectedBankId = () => {},
}) {
	const { balance, bankId } = itemData;
	const { totalValue } = selectedPayrun || checkedRow;

	const handleRadioChange = () => {
		if (balance >= totalValue) {
			setSelectedBankId((prevSelectedBankId) => (prevSelectedBankId === bankId ? '' : bankId));
		}
	};

	return (
		<div className={styles.radio_box}>
			{balance < totalValue ? (
				<div className={styles.radio_circle} />
			) : (
				<Radio
					checked={selectedBankId === bankId}
					onChange={handleRadioChange}
				/>
			)}
		</div>
	);
}

export default SelectRadio;
