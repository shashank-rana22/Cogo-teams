import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function BankDetails({ itemData }) {
	const { advanceDocumentSellerBankDetail, bankDetail } = itemData || {};
	const { accountNumber, bankName, ifscCode } = advanceDocumentSellerBankDetail || {};
	const { account_number:accountNo, beneficiary_name:beneficiaryName, ifsc_code:ifsc } = bankDetail?.[0] || [];
	return (
		<div>
			<div className={styles.text}>
				{bankName?.length || beneficiaryName?.length > 20
					? (
						<Tooltip
							interactive
							placement="top"
							content={bankName || beneficiaryName}
						>
							<text>

								{`${(bankName || beneficiaryName).substring(
									0,
									20,
								)}...`}

							</text>
						</Tooltip>
					) : bankName || beneficiaryName}
				{}
			</div>

			<div>
				<div className={styles.sub_container}>
					<div className={styles.label}>
						A/C No:
					</div>
					<div className={styles.value}>
						{accountNumber || accountNo}
					</div>
				</div>
				<div className={styles.sub_container}>
					<div className={styles.label}>
						IFSC:
					</div>
					<div className={styles.value}>
						{ifscCode || ifsc}
					</div>
				</div>
			</div>
		</div>
	);
}

export default BankDetails;
