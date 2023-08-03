import { Placeholder, Breadcrumb, Pill } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import useShipmentBack from '../../hooks/useShipmentBack';

import styles from './styles.module.css';

const SHIPMENT_TYPE_MAPPING = {
	consol : 'Consol',
	coload : 'Coload',
};

const COGO_ASSURED_IMAGE_URL = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-assured.svg';

function ShipmentInfo() {
	const { shipment_data, isGettingShipment } = useContext(ShipmentDetailContext);
	const { source = '', serial_id = '', is_cogo_assured = false } = shipment_data || {};

	const { handleShipmentsClick } = useShipmentBack();

	const sourceText = source === 'direct'
		? 'Sell Without Buy'
		: startCase(source);

	const shipmentType = SHIPMENT_TYPE_MAPPING[source] || 'Shipment';

	return (
		<div className={styles.container}>
			<Breadcrumb>
				<Breadcrumb.Item label="Shipments" className={styles.link} onClick={handleShipmentsClick} />
				<Breadcrumb.Item
					className={styles.inactive}
					label={isGettingShipment
						? <Placeholder width={100} />
						: `${shipmentType} ID  #${serial_id}`}
				/>
			</Breadcrumb>

			{source ? <Pill size="sm" color="blue" className={styles.pill}>{sourceText}</Pill> : null}

			{is_cogo_assured ? (
				<img
					src={COGO_ASSURED_IMAGE_URL}
					alt="cogo-assured"
					height={16}
				/>
			) : null}

		</div>
	);
}

export default ShipmentInfo;
