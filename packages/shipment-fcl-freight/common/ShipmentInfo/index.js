import { Breadcrumb, Tags, Placeholder } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import styles from './styles.module.css';

function ShipmentInfo() {
	const { shipment_data, isGettingShipment } = useContext(ShipmentDetailContext);

	const sourceText =	shipment_data?.source === 'direct'
		? 'Sell Without Buy'
		: startCase(shipment_data?.source);

	return !isGettingShipment ? (
		<div className={styles.container}>
			<Breadcrumb>
				<Breadcrumb.Item label={<a href="page number">Shipments</a>} />
				<Breadcrumb.Item label={`${shipment_data?.serial_id}`} />
			</Breadcrumb>
			{shipment_data?.source ? <Tags size="sm">{sourceText}</Tags> : null}
			{shipment_data?.is_cogo_assured ? (
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-assured.svg"
					alt="cogo-assured"
					width="8em"
					height="2em"
					style={{ marginLeft: '20px' }}
				/>
			) : <Placeholder className={styles.shipment_info} />}

		</div>
	) : null;
}

export default ShipmentInfo;
