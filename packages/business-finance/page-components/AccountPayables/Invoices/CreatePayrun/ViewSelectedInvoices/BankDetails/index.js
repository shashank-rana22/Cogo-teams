import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

function BankDetails({ itemData = {} }) {
	let bankDetail = {};

	if (Array.isArray(itemData?.bankDetail)) {
		bankDetail = itemData?.bankDetail?.[GLOBAL_CONSTANTS.zeroth_index];
	} else if (typeof itemData?.bankDetail === 'object') {
		bankDetail = itemData?.bankDetail;
	}

	const {
		bankName = '',
		ifsc_code = '',
		accountNo = '',
		bank_name = '',
		beneficiary_name = '',
		ifsc_number = '',
		account_number = '',
		ifscCode = '',
	} = bankDetail || {};

	return (
		<div className={styles.font}>
			<div className={styles.bold}>{bankName || bank_name || beneficiary_name}</div>
			<span>{`A/C No: ${accountNo || account_number}`}</span>
			<span className={styles.flex}>
				{`IFSC: ${ifsc_code || ifsc_number || ifscCode}`}
			</span>
		</div>
	);
}

export default BankDetails;
