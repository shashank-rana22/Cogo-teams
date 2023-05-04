import React, { useState } from 'react';
import {startCase} from '@cogoport/utils';
import useListShipments from '../../../../../../hooks/useListShipments';

import styles from './styles.module.css';

function OrgShipments({ item = {}}) {
	const { list, loading } = useListShipments({ item });
	return (
		<div className={styles.container}>
			<table>
				<thead>
					<tr className={styles.row}>
					<th>Shipment ID</th>
						<th> Service</th>
						<th>Trade Type</th>
						<th>Milestone</th>
						<th>Invoice Value</th>
						<th>Cargo Value</th> 
						<th>Payment Term</th> 
						<th>BL Status</th>
					</tr>
				</thead>
				<tbody>

					{(list || []).map((item)=> {
						<tr className={styles.row}>
							<td>{item?.serial_id}</td>
							<td>{startCase(item?.shipment_type)} </td>
							<td>{item?.trade_type}</td>
							<td>{item?.milestone}</td>
							<td>{item?.invoice_value}</td>
							<td>{item?.cargo_value}</td> 
							<td>{item?.payment_term}</td> 
							<td>{item?.bl_status}</td>
						</tr>
					})}
				</tbody>

			</table>
		</div>
	);

}

export default OrgShipments;
