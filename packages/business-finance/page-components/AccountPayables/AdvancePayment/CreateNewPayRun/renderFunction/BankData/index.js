import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const MAX_LENGTH = 16;

function BankData({ itemData }) {
	const { advanceDocumentSellerBankDetail } = itemData || {};
	const renderTooltip = (content, maxLength) => {
		if (content.length > maxLength) {
			return (
				<Tooltip interactive placement="top" content={content}>
					<div className={styles.value}>{`${content.substring(0, maxLength)}...`}</div>
				</Tooltip>
			);
		}
		return content;
	};

	const { accountNumber = '', bankName = '', ifscCode = '' } = advanceDocumentSellerBankDetail || {};

	return (
		<div>
			<div className={styles.text}>{renderTooltip(bankName, MAX_LENGTH)}</div>
			<div>
				<div className={styles.sub_container}>
					<div className={styles.label}>A/C No:</div>
					{renderTooltip(accountNumber, MAX_LENGTH)}
				</div>
				<div className={styles.sub_container}>
					<div className={styles.label}>IFSC:</div>
					{renderTooltip(ifscCode, MAX_LENGTH)}
				</div>
			</div>
		</div>
	);
}

export default BankData;
