import { Breadcrumb, Tags } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import styles from './styles.module.css';
import useShipmentBack from './useShipmentBack';

function ShipmentInfo() {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { handleShipmentsClick } = useShipmentBack();

	const showFeature = shipment_data?.stakeholder_types?.some((e) => ['superadmin',
		'booking_agent', 'sales_agent', 'user'].includes(e));

	const text = showFeature
		? `${shipment_data?.shipment_type} ID #${shipment_data?.serial_id}`
		: `Shipment ID  #${shipment_data?.serial_id}`;

	const sourceText =		shipment_data?.source === 'direct'
		? 'Sell Without Buy'
		: startCase(shipment_data?.source);

	return (
		<div className={styles.container}>
			<Breadcrumb>
				<Breadcrumb.Item label={<a href="/shipment-management">Shipments</a>} onClick={handleShipmentsClick} />
				<Breadcrumb.Item label={text} />
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
			) : null}

		</div>
	);
}

export default ShipmentInfo;
