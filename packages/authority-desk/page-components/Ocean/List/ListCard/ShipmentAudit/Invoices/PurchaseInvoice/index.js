import { Loader } from '@cogoport/components';
import React from 'react';

import EmptyState from '../../../../../../../commons/EmptyState';
import useGetBill from '../../../../../../../hooks/useGetBill';

import styles from './styles.module.css';

function PurchaseInvoice({ item }) {
	const { data, loadingBills } = useGetBill({ serial_id: item?.serial_id });

	if (loadingBills) {
		return (
			<div className={styles.loader}>
				Loading Invoice Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	if (data?.list?.length === 0 && !loadingBills) {
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
				<tbody>
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
				</tbody>
			</table>

		</div>
	);
}

export default PurchaseInvoice;
