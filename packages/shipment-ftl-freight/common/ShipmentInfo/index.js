import { Placeholder, Breadcrumb, Pill, Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMAlert } from '@cogoport/icons-react';
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
			</Breadcrumb>

			{shipment_data?.source ? <Pill size="sm" color="blue" className={styles.pill}>{sourceText}</Pill> : null}

			{shipment_data?.is_cogo_assured ? (
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-assured.svg"
					alt="cogo-assured"
					height={16}
				/>
			) : null}

			{shipment_data?.fm_rejection_reason ? (
				<Tooltip
					placement="top"
					content={<div>{shipment_data?.fm_rejection_reason}</div>}
				>
					<span className={styles.fm_rejection_icon}>
						<IcMAlert width={15} height={15} />
					</span>
				</Tooltip>
			) : null}
		</div>
	);
}

export default ShipmentInfo;
