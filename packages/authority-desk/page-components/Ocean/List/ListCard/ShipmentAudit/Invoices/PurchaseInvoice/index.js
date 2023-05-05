import React from 'react';

import useGetBill from '../../../../../../../hooks/useGetBill';

import styles from './styles.module.css';

function PurchaseInvoice({ item}) {
	const { loadingBills, data } = useGetBill({ serial_id : item?.serial_id });


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

export default PurchaseInvoice;
