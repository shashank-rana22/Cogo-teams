import React from 'react';

import { handleBillType } from '../../../../../../utils/getHandleBillType';

import styles from './styles.module.css';

function InvoiceNumber({ item, field }) {
	const {
		billDocumentUrl,
		billType = '',
		isProforma,
		billNumber,
		invoicePdfUrl,
		proformaPdfUrl,
		invoiceNumber,
		proformaNumber,
	} = item || {};

	return (
		<div className={styles.text}>
			{field.key === 'billNumber' && (
				<>
					<div
						className={styles.invoice}
						onClick={() => window.open(billDocumentUrl, '_blank')}
						role="presentation"
					>
						{billNumber}
					</div>
					<div className={styles.color}>{handleBillType(billType, isProforma)}</div>
				</>
			)}
			{field.key === 'invoiceNumber' && (
				<div
					className={styles.invoice}
					onClick={() => window.open(
						invoicePdfUrl || proformaPdfUrl,
						'_blank',
					)}
					role="presentation"
				>
					{invoiceNumber || proformaNumber}
				</div>
			)}
		</div>
	);
}

export default InvoiceNumber;
