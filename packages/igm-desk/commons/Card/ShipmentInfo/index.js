import { Tooltip, cl } from '@cogoport/components';

import styles, { container } from './styles.module.css';

export default function ShipmentInfo({ item = {} }) {
	const { serial_id, shipping_line } = item;

	return (
		<div className={container}>
			<div className={styles.serial_id}>
				Shipment ID #
				{serial_id}
			</div>
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
		</div>
	);
}
