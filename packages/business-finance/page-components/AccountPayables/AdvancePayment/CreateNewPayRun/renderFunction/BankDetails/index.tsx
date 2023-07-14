import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

interface BankDetailsProps {
	account_number:string,
	beneficiary_name:string,
	ifsc_code:string,
}
interface ItemProps {
	bankDetail?:Array<BankDetailsProps>
}
interface Props {
	itemData:ItemProps,
}
const MAX_LENGTH = 16;
function BankDetails({ itemData }:Props) {
	const { bankDetail } = itemData || {};
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
	const {
		account_number:accountNo = '',
		beneficiary_name:beneficiaryName = '',
		ifsc_code:ifsc = '',
	} = bankDetail[0] || {};

	return (
		<div>
			<div className={styles.text}>{renderTooltip(beneficiaryName, MAX_LENGTH)}</div>
			<div>
				<div className={styles.sub_container}>
					<div className={styles.label}>A/C No:</div>
					{renderTooltip(accountNo, MAX_LENGTH)}
				</div>
				<div className={styles.sub_container}>
					<div className={styles.label}>IFSC:</div>
					{renderTooltip(ifsc, MAX_LENGTH)}
				</div>
			</div>
		</div>
	);
}

export default BankDetails;
