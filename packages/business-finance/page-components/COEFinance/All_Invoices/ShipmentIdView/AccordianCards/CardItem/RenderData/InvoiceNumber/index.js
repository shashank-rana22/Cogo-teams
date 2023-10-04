import React from 'react';

import { handleBillType } from '../../../../../../utils/getHandleBillType';

import styles from './styles.module.css';

interface ItemTypes {
	billDocumentUrl?: string;
	billType?: string,
	isProforma?: boolean,
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
