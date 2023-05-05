import { format, Loader } from '@cogoport/components';
import { startCase } from '@cogoport/utils'; 
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';
import EmptyState from '../../../../../../commons/EmptyState';
import useListInvoiceWrapper from '../../../../../../hooks/useListInvoiceWrapper';

import styles from './styles.module.css';

function ShipmentInvoices({ item = {} }) {
	const { data, loading } = useListInvoiceWrapper({ serial_id: item?.serial_id });

	if (data?.list?.length === 0 && !loading) {
		return <EmptyState />;
	}

	if (loading) {
		return 	(
			<div className={styles.loader}>
				Loading Invoices Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<table>
				<thead>
					<tr className={styles.row}>
						<th>Invoice Number</th>
						<th>Type </th>
						<th>Invoice Value</th>
						<th> Balance Amount</th>
						<th>Due Date</th>
						<th>Payment Status </th>
					</tr>
				</thead>
				<tbody>

					{(data?.list || []).map((item) => {
						<tr className={styles.row}>
							<td>{item?.invoiceNumber}</td>
							<td>
								{item?.invoiceType}
								{' '}
							</td>
							<td>{formatAmount({amount : item?.invoiceValue,
								 currency : item?.invoiceCurrency,
								 options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								}
								 })  }</td>
							<td>{item?.balanceAmount}</td>
							<td>{format(item?.dueDate, 'dd MM yyyy', null, true)}</td>
							<td>{startCase(item?.paymentStatus)}</td>
						</tr>;
					})}
				</tbody>

			</table>
		</div>
	);
}

export default ShipmentInvoices;
