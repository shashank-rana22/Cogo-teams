import React, { useState } from 'react';
import { startCase } from '@cogoport/utils';
import useListInvoiceWrapper from '../../../../../../hooks/useListInvoiceWrapper';
import { format} from '@cogoport/components';
import styles from './styles.module.css';

function ShipmentInvoices({ item = {}}) { 

	const { data, loading } = useListInvoiceWrapper({serial_id :  item?.serial_id}); 

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

					{(data?.list || []).map((item)=> {
						<tr className={styles.row}>
							<td>{item?.invoiceNumber}</td>
							<td>{item?.invoiceType} </td>
							<td>{item?.invoiceValue}</td>
							<td>{item?.balanceAmount}</td>
							<td>{format(item?.dueDate, 'dd MM yyyy', null, true)}</td>
							<td>{startCase(item?.paymentStatus)}</td> 
						</tr>
					})}
				</tbody>

			</table>
		</div>
	);
}

export default ShipmentInvoices;
