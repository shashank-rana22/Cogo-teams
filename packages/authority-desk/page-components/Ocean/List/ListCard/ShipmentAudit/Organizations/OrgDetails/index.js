import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../../../commons/EmptyState';
import useListInvoiceWrapper from '../../../../../../../hooks/useListInvoiceWrapper';

import styles from './styles.module.css';

function OrgDetails({ registerationNumber = '' }) {
	const { data, loading } = useListInvoiceWrapper({ registerationNumber });

	if (data?.list?.length === 0 && !loading) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>
			<table>
				<th>
					<td>
						Invoice Number
					</td>
					<td>
						Type
					</td>
					<td> Invoice Value</td>
					<td> Paid Amount</td>
					<td> Balance Amount</td>
					<td> Due Date</td>
					<td>Payment Status</td>
				</th>
				{(data?.list || []).map((val) => (
					<tr key={val.id}>
						<td>{val?.invoiceNumber || val?.proformaNumber}</td>
						<td>
							{startCase(val?.invoiceType)}
						</td>
						<td>
							{formatAmount({
								amount   : val?.grandTotal,
								currency : val?.billCurrency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
							{' '}

						</td>
						<td>
							{formatAmount({
								amount   : val?.paidAmount,
								currency : val?.billCurrency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}

						</td>

						<td>
							{formatAmount({
								amount   : val.grandTotal - val.paidAmount - val.paidTds,
								currency : val?.billCurrency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}

						</td>
						<td>{val?.dueDate}</td>
						<td>{val?.paymentStatus}</td>
					</tr>
				))}
			</table>

		</div>
	);
}

export default OrgDetails;
