import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

export default function ShipmentInfo({ item = {} }) {
	const { serial_id, service_provider, costbooking_ops } = item;

	return (
		<div className={styles.container}>
			<div className={styles.serial_id}>
				Shipment ID #
				{serial_id}
			</div>

			<div className={styles.tooltip_container}>
				<Tooltip
					placement="bottom"
					interactive
					content={service_provider?.business_name}
				>
					<div className={styles.ellipsis_text}>{service_provider?.business_name}</div>
				</Tooltip>
			</div>

			{costbooking_ops?.name ? (
				<div className={styles.so1_container}>
					Cost Booking OPs:
					{' '}
					{costbooking_ops.name}
				</div>
			) : null}
		</div>
	);
}
