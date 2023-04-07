import React from 'react';

import { formatDate } from '../../../../commons/utils/formatDate';
import getFormattedPrice from '../../../../commons/utils/getFormattedPrice';

import styles from './styles.module.css';

interface Props {
	isProforma?: boolean;
	billNumber?: string;
	amount?: number;
	billCurrency?: string;
	lineItemCount?: string;
	createdAt?: Date;
	childBill?: object[]
}

export function ProformaTagCards({
	item, classname,
}: { item: Props, classname?: string }) {
	const newItem = item;
	return (
		<div className={`
		${styles.proforma_tagcards_container} ${classname === 'merge' ? styles.merge : ''}`}
		>
			<div
				className={`${styles.details_wrapper}`}
			>
				<div className={`${styles.flexdiv}`}>
					<div className={`${styles.proforma}`}>
						{newItem?.isProforma ? 'Proforma' : 'Invoice'}
						{' '}
						-
					</div>
					<span style={{ color: '#5936f0', marginTop: '-2px' }}>
						{newItem?.billNumber}
					</span>
				</div>
				<div>
					{getFormattedPrice(
						newItem?.amount,
						newItem?.billCurrency,
						{
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					)}
					{' '}
					| Line Items (
					{newItem?.lineItemCount}
					)
				</div>
				<div className={`${styles.updated_at}`}>
					Uploaded At -
					{' '}
					{formatDate(newItem?.createdAt, 'dd MMM yyyy', {}, true)}
				</div>
			</div>
		</div>
	);
}
