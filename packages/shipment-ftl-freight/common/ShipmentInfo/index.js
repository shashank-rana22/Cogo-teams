import { Placeholder, Breadcrumb, Pill, Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMAlert } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import useGetDaysToClosure from '../../hooks/useGetDaysToClosure';
import useShipmentBack from '../../hooks/useShipmentBack';

import styles from './styles.module.css';

function ShipmentInfo() {
	const { shipment_data, isGettingShipment } = useContext(ShipmentDetailContext);
	const { serial_id = '' } = shipment_data || {};

	const { handleShipmentsClick } = useShipmentBack();

	const { remaining_closure_days = 0 } = useGetDaysToClosure({ serial_id });

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

			{remaining_closure_days ? (
				<Pill size="sm" color="#c4dc91" className={styles.pill}>
					Operational Closure in:
					{' '}
					{remaining_closure_days}
					{' '}
					Day(s)
				</Pill>
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
