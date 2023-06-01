import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

interface BankType {
	accountNumber: string;
	bankName: string;
	ifscCode: string;
}

interface PropsType {
	advanceDocumentSellerBankDetail: BankType;
}
interface ItemProps {
	itemData: PropsType;
}
const MAX_LENGTH = 16;

function BankData({ itemData }: ItemProps) {
	const { advanceDocumentSellerBankDetail } = itemData || {};
	const renderTooltip = (content: string, maxLength: number) => {
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
