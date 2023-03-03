import React from 'react';

import styles from './styles.module.css';

interface ItemTypes {
	billDocumentUrl?: string;
	billNumber?: string;
	invoicePdfUrl?: string;
	proformaPdfUrl?: string;
	invoiceNumber?: string;
	proformaNumber?: string;
}

interface PropsType {
	item: ItemTypes;
	field: any;
}

function InvoiceNumber({ item, field }: PropsType) {
	const handleBillType = (type: any) => {
		let invoiceType = 'Purchase Invoice';

		if (type?.billType === 'CREDIT_NOTE') {
			invoiceType = 'Credit Note';
		} else if (type?.isProforma) {
			invoiceType = 'Proforma Invoice';
		}
		return invoiceType;
	};

	const { billDocumentUrl, billNumber, invoicePdfUrl, proformaPdfUrl, invoiceNumber, proformaNumber } = item || {};

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
					<div className={styles.color}>{handleBillType(item)}</div>
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
