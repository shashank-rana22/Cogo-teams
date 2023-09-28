import { Placeholder, Breadcrumb, Pill } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import useGetDaysToClosure from '../../hooks/useGetDaysToClosure';
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

	const { remaining_closure_days = 0 } = useGetDaysToClosure({ serial_id });

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
				<Image
					src={GLOBAL_CONSTANTS.image_url.cogo_assured_svg}
					alt="cogo-assured"
					height={16}
					width={88}
				/>
			) : null}

			{remaining_closure_days ? (
				<Pill size="sm" color="#c4dc91" className={styles.pill}>
					Operational Closure in:
					{' '}
					{remaining_closure_days}
					{' '}
					Day(s)
				</Pill>
			) : null}

		</div>
	);
}

export default ShipmentInfo;
