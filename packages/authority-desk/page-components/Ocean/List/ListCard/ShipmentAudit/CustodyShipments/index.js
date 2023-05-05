import { Loader } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../../commons/EmptyState';
import useListShipments from '../../../../../../hooks/useListShipments';

import styles from './styles.module.css';

function OrgShipments({ item = {} }) {
	const { list, loading } = useListShipments({ item });

	if (list?.length === 0 && !loading) {
		return <EmptyState />;
	}

	if (loading) {
		return (
			<div className={styles.loader}>
				Loading Shipments Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	const docStatusMapping = {
		pending  : 'Final BL not uploaded',
		uploaded : 'Final BL collected',
	};

	const renderBLDetails = (blDetails) => (
		<div>
			{['uploaded', 'pending'].includes(blDetails.status)
      	? docStatusMapping[blDetails.status]
      	: startCase(blDetails.status)}
		</div>
	);

	const renderDODetails = (doDetails) => (
		<div>{startCase(doDetails.status)}</div>
	);

	return (
		<div className={styles.container}>
			<table>
				<thead>
					<tr className={styles.row}>
						<th>Shipment ID</th>
						<th>Service</th>
						<th>Trade Type</th>
						<th>Milestone</th>
						<th>Invoice Value</th>
						<th>Cargo Value</th>
						<th>Payment Term</th>
						<th>BL Status</th>
						<th>DO Status</th>
						<th>Booking Agent</th>
					</tr>
				</thead>

				<tbody>
					{(list || []).map((item) => (
						<tr className={styles.row} key={item.serial_id}>
							<td>{item?.serial_id}</td>
							<td>
								{startCase(item?.shipment_type)}
								{' '}
							</td>
							<td>{startCase(item?.trade_type)}</td>
							<td>{startCase(item?.state)}</td>
							<td />
							<td>{item?.cargo_value || '--'}</td>
							<td>{startCase(item?.payment_term || '--')}</td>
							<td>
								{(item?.bl_details || []).map(renderBLDetails)}
							</td>
							<td>
								{(item?.do_details || []).map(renderDODetails)}
							</td>
							<td>{item.booking_agent?.name || '--'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default OrgShipments;
