import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

interface BankType {
	accountNumber:string,
	bankName:string,
	ifscCode:string,
}

interface PropsType {
	advanceDocumentSellerBankDetail:BankType,
}
interface ItemProps {
	itemData:PropsType,
}

const NAME_LENGTH = 20;

function BankData({ itemData }:ItemProps) {
	const { advanceDocumentSellerBankDetail } = itemData || {};
	const { accountNumber = '', bankName = '', ifscCode = '' } = advanceDocumentSellerBankDetail || {};

	return (
		<div>
			<div className={styles.text}>
				{bankName.length > NAME_LENGTH
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
