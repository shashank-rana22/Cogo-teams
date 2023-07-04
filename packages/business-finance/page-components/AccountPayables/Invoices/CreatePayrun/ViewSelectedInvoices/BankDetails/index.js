import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

function BankDetails({ itemData }) {
	const {
		bankDetail,
	} = itemData || {};
	const {
		bankName = '',
		ifsc_code = '',
		accountNo = '',
		bank_name = '',
		beneficiary_name = '',
		ifsc_number = '',
		account_number = '',
	} = bankDetail?.[GLOBAL_CONSTANTS.zeroth_index] || {};
	return (
		<div className={styles.font}>
			<div className={styles.bold}>{bankName || bank_name || beneficiary_name}</div>
			<span>{`A/C No: ${accountNo || account_number}`}</span>
			<span className={styles.flex}>
				{`IFSC: ${ifsc_code || ifsc_number}`}
			</span>
		</div>
	);
}

export default BankDetails;
