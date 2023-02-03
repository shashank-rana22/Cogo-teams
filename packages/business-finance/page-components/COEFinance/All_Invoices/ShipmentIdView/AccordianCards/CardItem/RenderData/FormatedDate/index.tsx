import React from 'react';

import { formatDate } from '../../../../../../../commons/utils/formatDate';

import styles from './styles.module.css';

interface ItemTypes {
	billDate?: Date;
	dueDate?: Date;
	invoiceDate?: Date;
	createdDate?: Date;
}

interface PropsType {
	item: ItemTypes;
	field?: any;
}

function FormatedDate({ item, field }: PropsType) {
	const { billDate, dueDate, invoiceDate, createdDate } = item || {};
	const getBillDate = formatDate(billDate!, 'dd/MMM/yyyy', {}, true);
	const getDueDate = formatDate(dueDate!, 'dd/MMM/yyyy', {}, true);
	const getInvoiceDate = formatDate(invoiceDate!, 'dd/MMM/yyyy', {}, true);
	const getLastModifiedDate = formatDate(
		createdDate!,
		'dd/MMM/yyyy hh:mm:ss',
		{},
		true,
	);

	return (
		<div className={styles.text}>
			{field.key === 'billDate' && <div>{getBillDate}</div>}
			{field.key === 'dueDate' && <div>{getDueDate}</div>}
			{field.key === 'invoiceDate' && (
				<div>
					{' '}
					{getInvoiceDate}
				</div>
			)}
			{field.key === 'createdDate' && (
				<div>
					{getLastModifiedDate}
					{' '}
				</div>
			)}
		</div>
	);
}

export default FormatedDate;
