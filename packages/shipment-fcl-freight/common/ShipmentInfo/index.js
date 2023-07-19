import { Placeholder, Breadcrumb, Pill } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useShipmentBack } from '@cogoport/ocean-modules';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import styles from './styles.module.css';

function ShipmentInfo() {
	const { shipment_data, isGettingShipment, stakeholderConfig } = useContext(ShipmentDetailContext);

	const { handleShipmentsClick } = useShipmentBack();

	const sourceText = shipment_data?.source === 'direct'
		? 'Sell Without Buy'
		: startCase(shipment_data?.source);

	const showSource = !!stakeholderConfig?.shipment_info?.show_source;

	return (
		<div className={styles.container}>
			<Breadcrumb>
				<Breadcrumb.Item label="Shipments" className={styles.link} onClick={handleShipmentsClick} />
				<Breadcrumb.Item
					className={styles.inactive}
					label={isGettingShipment
						? <Placeholder width={100} />
						: `Shipment ID  #${shipment_data?.serial_id}`}
				/>
			</Breadcrumb>

			{showSource && shipment_data?.source
				? (
					<Pill size="sm" color="blue" className={styles.pill}>
						{sourceText}
					</Pill>
				) : null}

			{showSource && shipment_data?.is_cogo_assured ? (
				<img
					src={GLOBAL_CONSTANTS.image_url.cogo_assured_svg}
					alt="cogo-assured"
					height={16}
				/>
			) : null}

		</div>
	);
}

export default ShipmentInfo;
