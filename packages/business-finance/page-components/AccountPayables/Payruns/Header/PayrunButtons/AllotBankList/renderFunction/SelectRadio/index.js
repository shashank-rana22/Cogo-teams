import { Radio } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function SelectRadio({
	itemData = {}, selectedBankId = null, checkedRow = null,
	selectedPayrun = {}, setSelectedBankId = () => {},
}) {
	const { balance, bankId } = itemData;
	const { totalValue } = selectedPayrun || checkedRow || {};
	const handleRadioChange = () => {
		if (selectedBankId) {
			setSelectedBankId('');
			if (balance >= totalValue) {
				setSelectedBankId(bankId);
			}
		} else if (balance >= totalValue) {
			setSelectedBankId(bankId);
		}
	};
	return (
		<div className={styles.radio_box}>
			{balance < totalValue ? (
				<div className={styles.radio_circle} />
			) : (
				<Radio
					// style={{ display: 'flex', justifyContent: 'center', width: '80px' }}
					checked={selectedBankId === bankId}
					onChange={handleRadioChange}
				/>
			)}
		</div>
	);
}

export default SelectRadio;
