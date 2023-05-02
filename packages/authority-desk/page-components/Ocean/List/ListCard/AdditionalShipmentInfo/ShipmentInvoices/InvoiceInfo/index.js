import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import styles from './styles.module.css';

function InvoiceInfo({ item = {} }) {
	return (
		<div className={styles.container}>

			<div>
				{item?.invoiceNumber || item?.proformaNumber}
			</div>
			<div>
				{item?.invoiceType}
			</div>
			<div>
				{formatAmount({
					amount   : item?.grandTotal,
					currency : item?.currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				})}
			</div>
			<div>
				{formatAmount({
					amount   : item?.balanceAmount,
					currency : item?.currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				})}
			</div>
			<div>
				{formatDate({
					date       : item?.dueDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</div>
			<div>
				{item?.paymentStatus}
			</div>

		</div>
	);
}

export default InvoiceInfo;
