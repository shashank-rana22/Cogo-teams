import { Tooltip, cl } from '@cogoport/components';

import styles from './styles.module.css';

export default function ShipmentInfo({ item = {} }) {
	const { serial_id, service_provider, service_ops2, shipping_line } = item;

	return (
		<div className={styles.container}>
			<div className={cl`${styles.heading} ${styles.shipment_id}`}>
				Shipment ID #
				{serial_id}
			</div>
			<Tooltip
				placement="bottom"
				interactive
				content={<div>{service_provider?.business_name}</div>}
			>
				<div className={styles.business_name}>{service_provider?.business_name}</div>
			</Tooltip>
			<Tooltip
				placement="bottom"
				interactive
				content={(
					<div>
						{shipping_line?.business_name}
					</div>
				)}
			>
				<div className={styles.heading}>
					Line:
					<div className={cl`${styles.ellipsis_text} ${styles.pointer}`}>{shipping_line?.business_name}</div>
				</div>
			</Tooltip>
			{service_ops2?.name ? (
				<div className={styles.heading}>
					SO2:
					<div className={cl`${styles.ellipsis_text} ${styles.so2}`}>{service_ops2.name}</div>
				</div>
			) : null}
		</div>
	);
}
