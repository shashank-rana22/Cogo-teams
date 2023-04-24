import { IcMEdit } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function BankDetails({ itemData }) {
	const { advanceDocumentSellerBankDetail } = itemData || {};
	const { accountNumber, bankName, ifscCode } = advanceDocumentSellerBankDetail || {};
	return (
		<div>
			<div className={styles.text}>
				{bankName}
			</div>
			<div className={styles.sub_container}>
				<div className={styles.label}>
					A/C No:
				</div>
				<div className={styles.value}>
					{accountNumber}
				</div>
				<div className={styles.label}>
					IFSC:
				</div>
				<div className={styles.value}>
					{ifscCode}
				</div>
				<div>
					<IcMEdit className={styles.icon} />
				</div>
			</div>
		</div>
	);
}

export default BankDetails;
