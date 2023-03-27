import { Tooltip } from '@cogoport/components';

import styles, { container, so1_container, ellipsis_text } from './styles.module.css';

export default function ShipmentInfo({ item = {} }) {
	const { serial_id, service_provider, stakeholder } = item;

	return (
		<div className={container}>
			<div className={styles.serial_id}>
				Shipment ID #
				{serial_id}
			</div>
			<Tooltip
				placement="bottom"
				interactive
				content={<div>{service_provider?.business_name}</div>}
			>
				<div className={ellipsis_text}>{service_provider?.business_name}</div>
			</Tooltip>
			{stakeholder?.name ? (
				<div className={so1_container}>
					SO1 :
					{stakeholder.name}
				</div>
			) : null}
		</div>
	);
}
