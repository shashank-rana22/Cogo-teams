import { Placeholder, Breadcrumb, Pill } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import useShipmentBack from '../../hooks/useShipmentBack';

import styles from './styles.module.css';

const SHIPMENT_TYPE_MAPPING = {
	consol : 'Consol',
	coload : 'Coload',
};

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
					src={GLOBAL_CONSTANTS.image_url.cogo_assured_svg}
					alt="cogo-assured"
					height={16}
				/>
			) : null}

			{/* todo anmol: check is key is present then show this */}
			<Pill size="sm" color="green" className={styles.pill}>Operational Closure in: 3 Days</Pill>
		</div>
	);
}

export default ShipmentInfo;
