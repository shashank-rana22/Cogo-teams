import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import showOverflowingNumber from '../../../../../../../commons/showOverflowingNumber';

import styles from './styles.module.css';

interface ItemTypes {
	grandTotal?: number;
	subTotal?:number;
	billCurrency?: string;
	currency?: string;
}

interface PropsType {
	item: ItemTypes;
	field?: any;
}

function AmountWithCurrency({ item, field }: PropsType) {
	const { grandTotal, subTotal, billCurrency, currency }: ItemTypes = item;

	const formattedAmount = formatAmount({
		amount   :	grandTotal as any,
		currency :	billCurrency || currency || GLOBAL_CONSTANTS.currency_code.INR,
		options  : {
			style           : 'currency',
			currencyDisplay : 'code',
		},
	}) || '';
	const content = (
		<>
			<div className={styles.pre_tax}>
				Pre Tax :
				<text className={styles.pre_tax_amount}>
					{formatAmount({
						amount   :	subTotal as any,
						currency :	billCurrency || currency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}
				</text>
			</div>
			<div className={styles.post_tax}>
				Post Tax:
				<text className={styles.post_tax_amount}>
					{formatAmount({
						amount   :	grandTotal as any,
						currency :	billCurrency || currency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}
				</text>
			</div>
		</>
	);
	return (
		<div>
			<div className={styles.text}>
				{field.key === 'grandTotal' && (
					<div className={styles.size}>
						<div className={styles.amount_value}>
							{' '}
							{showOverflowingNumber(formattedAmount, 12)}
						</div>
						<Tooltip placement="top" content={content} interactive>
							<div className={styles.ic_min_icon}>
								<IcMInfo width="16px" height="16px" />
							</div>
						</Tooltip>
					</div>
				)}
			</div>
		</div>

	);
}

export default AmountWithCurrency;
