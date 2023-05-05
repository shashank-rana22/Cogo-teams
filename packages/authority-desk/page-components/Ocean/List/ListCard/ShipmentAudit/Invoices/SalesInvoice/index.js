import { Loader } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase, format } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../../../commons/EmptyState';
import useListInvoiceWrapper from '../../../../../../../hooks/useListInvoiceWrapper';

import styles from './styles.module.css';

function SalesInvoice({ item = {} }) {
	const { data, loading } = useListInvoiceWrapper({ serial_id: item?.serial_id });

	if (loading) {
		return (
			<div className={styles.loader}>
				Loading Invoice Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	if (data?.list?.length === 0 && !loading) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>
			<table>
				<th>
					<td>Invoice Number</td>
					<td>Type</td>
					<td>Invoice Value</td>
					<td>Paid Amount</td>
					<td>Balance Amount</td>
					<td>Due Date</td>
					<td>Payment Status</td>
				</th>
				{(data?.list || []).map((val) => (
					<tr key={val.id}>
						<td>{val?.invoiceNumber || val?.proformaNumber}</td>
						<td>{startCase(val?.invoiceType)}</td>
						<td>
							{formatAmount({
								amount   : val?.subTotals,
								currency : val?.currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</td>
						<td>-</td>
						<td>{val?.balanceAmount}</td>
						<td>{format(val?.dueDate, 'dd MMM yyyy', null, true)}</td>
						<td>{startCase(val?.paymentStatus)}</td>
					</tr>
				))}
			</table>
		</div>

	);
}

export default SalesInvoice;
