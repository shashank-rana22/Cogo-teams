import React from 'react';

import useListInvoiceWrapper from '../../../../../../../hooks/useListInvoiceWrapper';

import styles from './styles.module.css';

function OrgDetails({ registerationNumber = '' }) {
	const { data, loading } = useListInvoiceWrapper({ registerationNumber });

	console.log(data, 'data');

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
							{val?.invoiceType}
						</td>
						<td>{val?.subTotals}</td>
						<td>-</td>
						<td>{val?.balanceAmount}</td>
						<td>{val?.dueDate}</td>
						<td>{val?.paymentStatus}</td>
					</tr>
				))}
			</table>

		</div>
	);
}

export default OrgDetails;
