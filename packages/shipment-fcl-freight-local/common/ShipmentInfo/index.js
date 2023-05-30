import { Placeholder, Breadcrumb, Pill } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import useShipmentBack from '../../hooks/useShipmentBack';

import styles from './styles.module.css';

function ShipmentInfo() {
	const { shipment_data, isGettingShipment } = useContext(ShipmentDetailContext);

	const { handleShipmentsClick } = useShipmentBack();

	const sourceText = shipment_data?.source === 'direct'
		? 'Sell Without Buy'
		: startCase(shipment_data?.source);

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
				{shipment_data?.source
					? (
						<Breadcrumb.Item
							className={styles.text}
							label={<Pill size="sm" color="blue" className={styles.pill}>{sourceText}</Pill>}
						/>
					) : null}

			</Breadcrumb>

			{shipment_data?.is_cogo_assured ? (
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-assured.svg"
					alt="cogo-assured"
					height={16}
				/>
			) : null}

		</div>
	);
}

export default ShipmentInfo;
