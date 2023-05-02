import { Toggle } from '@cogoport/components';
import React, { useState } from 'react';

import useListShipments from '../../../../../../hooks/useListShipments';

import ShipmentInfo from './ShipmentInfo';
import styles from './styles.module.css';

function OrgShipments() {
	const { list, loading } = useListShipments();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.shipment_id}>
					<b>Shipment ID</b>
				</div>
				<div className={styles.service}><b>Service</b></div>
				<div className={styles.trade_type}>
					{' '}
					<b>Trade Type </b>
					{' '}
				</div>
				<div className={styles.milestone}>
					<b> Milestone</b>
					{' '}
				</div>
				<div className={styles.invoice_value}>
					{' '}
					<b>  Invoice Value </b>
					{' '}
				</div>
				<div className={styles.cargo_value}>
					{' '}
					<b> Cargo Value </b>
					{' '}
				</div>
				<div className={styles.payment_term}>
					{' '}
					<b>Payment Term </b>
					{' '}
				</div>
				<div className={styles.bl_status}>
					{' '}
					<b>BL Status </b>
					{' '}
				</div>
			</div>

			<div className={styles.body_list}>
				{ (list || []).map((item) => <ShipmentInfo item={item} />)}
			</div>

		</div>
	);
}

export default OrgShipments;
