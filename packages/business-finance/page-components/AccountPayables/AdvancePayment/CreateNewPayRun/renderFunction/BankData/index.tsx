import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function BankData({ itemData }) {
	const { advanceDocumentSellerBankDetail } = itemData || {};
	const { accountNumber, bankName, ifscCode } = advanceDocumentSellerBankDetail || {};
	return (
		<div>
			<div className={styles.text}>
				{bankName?.length > 20
					? (
						<Tooltip
							interactive
							placement="top"
							content={bankName}
						>
							<text>

								{`${(bankName).substring(
									0,
									20,
								)}...`}

							</text>
						</Tooltip>
					) : bankName}
			</div>

			<div>
				<div className={styles.sub_container}>
					<div className={styles.label}>
						A/C No:
					</div>
					<div className={styles.value}>
						{accountNumber}
					</div>
				</div>
				<div className={styles.sub_container}>
					<div className={styles.label}>
						IFSC:
					</div>
					<div className={styles.value}>
						{ifscCode}
					</div>
				</div>
			</div>
		</div>
	);
}

export default BankData;
