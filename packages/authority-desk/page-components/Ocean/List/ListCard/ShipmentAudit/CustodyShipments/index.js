import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useListShipments from '../../../../../../hooks/useListShipments';

import styles from './styles.module.css';

function CustodyShipments({ item = {} }) {
	const { list, loading } = useListShipments({ item });

	const docStatusMapping = {
		pending  : 'Final BL not uploaded',
		uploaded : 'Final BL collected',
	};

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
						<th>Do Status</th>
						<th>KAM</th>
					</tr>
				</thead>
				<tbody>
					{(list || []).map((item) => (
						<tr className={styles.row}>
							<td>{item?.serial_id}</td>
							<td>
								{startCase(item?.shipment_type)}
								{' '}
							</td>
							<td>{item?.trade_type}</td>
							<td>{startCase(item?.state)}</td>
							<td>

								{/* {
								formatAmount({
								amount: item?.inr_invoice_value,
								currency: item?.currency,
									})

								}  */}

							</td>
							<td>{item?.cargo_value || '--'}</td>
							<td>{item?.payment_term || '--'}</td>
							<td>
								{item?.bl_details?.map((blDetails) => (
									<div>
										{['uploaded', 'pending'].includes(
											blDetails?.status,
										)
											? docStatusMapping[
												blDetails?.status
												  ]
											: startCase(blDetails?.status)}
									</div>
								))}
							</td>
							<td>
								{item?.do_details?.map((doDetails) => (
									<div>
										{startCase(doDetails?.status)}
									</div>
								))}
							</td>
							<td>
								{' '}
								{item?.booking_agent?.name || '--'}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default CustodyShipments;
