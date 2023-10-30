import React from 'react';

import { formatDate } from '../../../../../../../commons/utils/formatDate';

import styles from './styles.module.css';

function FormatedDate({ item, field }) {
	const { billDate, dueDate, invoiceDate, createdDate, updatedAt } = item || {};
	const getBillDate = formatDate(billDate, 'dd MMM, yyyy', {}, true);
	const getDueDate = formatDate(dueDate, 'dd MMM, yyyy', {}, true);
	const getInvoiceDate = formatDate(invoiceDate, 'dd MMM, yyyy', {}, true);
	const getLastModifiedDate = formatDate(
		createdDate || updatedAt,
		'dd MMM, yyyy hh:mm:ss',
		{},
		true,
	);

	return (
		<div className={styles.text}>
			{field.key === 'billDate' && <div className={styles.size}>{getBillDate}</div>}
			{field.key === 'dueDate' && <div className={styles.size}>{getDueDate}</div>}
			{field.key === 'invoiceDate' && (
				<div className={styles.size}>
					{getInvoiceDate}
				</div>
			)}
			{(field.key === 'createdDate' || field.key === 'updatedAt') && (
				<div className={styles.size}>
					{getLastModifiedDate}
				</div>
			)}
		</div>
	);
}

export default FormatedDate;
