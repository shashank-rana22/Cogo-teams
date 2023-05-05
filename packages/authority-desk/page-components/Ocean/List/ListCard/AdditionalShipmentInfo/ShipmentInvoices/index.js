import { Loader } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase, format } from '@cogoport/utils';
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

					{(data?.list || []).map((val) => (
						<tr className={styles.row}>
							<td>{val?.invoiceNumber}</td>
							<td>
								{val?.invoiceType}
								{' '}
							</td>
							<td>
								{formatAmount({
									amount   : val?.invoiceValue,
									currency : val?.invoiceCurrency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								}) }

							</td>
							<td>{val?.balanceAmount}</td>
							<td>{format(val?.dueDate, 'dd MM yyyy', null, true)}</td>
							<td>{startCase(val?.paymentStatus)}</td>
						</tr>
					))}
				</tbody>

			</table>
		</div>
	);
}

export default ShipmentInvoices;
