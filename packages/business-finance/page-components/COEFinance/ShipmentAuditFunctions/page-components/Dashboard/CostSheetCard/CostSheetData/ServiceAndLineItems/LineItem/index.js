import { Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function LineItem({
	lineItem = {},
}) {
	const {
		sellQuotationTotal = '', buyQuotationTotal = '',
		invoiceTotal = '', billTotal = '', currency = '',
	} = lineItem || {};
	return (
		<div className={styles.item_container}>
			<div className={styles.line_item_sub_container}>{`${lineItem?.name} (${lineItem?.code})`}</div>
			<div className={styles.line_item_sub_container}>
				<div className={styles.detailed_price}>
					<div className={styles.faded}>
						{!isEmpty(sellQuotationTotal) ? formatAmount({
							amount   : sellQuotationTotal,
							currency : currency || 'INR',
							options  : {
								currencyDisplay : 'code',
								style           : 'currency',
							},
						}) : null}
						{sellQuotationTotal !== ''
							? (<span>(Excepted)</span>)
							: '-'}
					</div>
					<div className={styles.regular}>
						{!isEmpty(invoiceTotal) ? formatAmount({
							amount   : invoiceTotal,
							currency : currency || 'INR',
							options  : {
								currencyDisplay : 'code',
								style           : 'currency',
							},
						}) : null}
						{sellQuotationTotal === '' ? (
							<span>
								<Pill color="red">Not Quoted</Pill>
							</span>
						) : null}
					</div>
				</div>
			</div>
			<div className={styles.line_item_sub_container}>
				<div className={styles.detailed_price}>
					<div className={styles.faded}>
						{!isEmpty(buyQuotationTotal) ? formatAmount({
							amount   : buyQuotationTotal,
							currency : currency || 'INR',
							options  : {
								currencyDisplay : 'code',
								style           : 'currency',
							},
						}) : null}
						{buyQuotationTotal !== ''
							? (<span>(Excepted)</span>)
							: '-'}
					</div>
					<div>
						{!isEmpty(billTotal) ? formatAmount({
							amount   : billTotal,
							currency : currency || 'INR',
							options  : {
								currencyDisplay : 'code',
								style           : 'currency',
							},
						}) : null}
						{buyQuotationTotal === '' && billTotal !== '' ? (
							<span>
								<Pill color="red">Not Quoted</Pill>
							</span>
						) : '-'}
					</div>
				</div>
			</div>
		</div>
	);
}

export default LineItem;
