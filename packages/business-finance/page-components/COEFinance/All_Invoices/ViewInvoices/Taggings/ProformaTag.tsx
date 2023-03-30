import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import styles from './styles.module.css';

interface Props {
	isProforma?: boolean;
	billNumber?: string;
	amount?: string;
	billCurrency?: string;
	lineItemCount?: string;
	createdAt?: string;
	childBill?: object[]
}

export function ProformaTagCards({
	item,
}: { item:Props }) {
	const newItem = item;
	return (
		<div className={`${styles.tagged} ${styles.proforma_tagcards_container}`}>
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
					{formatAmount({
						amount   : newItem?.amount,
						currency : newItem?.billCurrency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
					{' '}
					| Line Items (
					{newItem?.lineItemCount}
					)
				</div>
				<div className={`${styles.updated_at}`}>
					Uploaded At -
					{' '}
					{formatDate({
						date       : newItem?.createdAt,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>
			</div>
		</div>
	);
}
