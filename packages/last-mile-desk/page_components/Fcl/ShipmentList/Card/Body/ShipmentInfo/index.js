import { cl, Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function ShipmentInfo({ item = {} }) {
	const { lastmile_ops = {}, shipping_line = {}, service_provider = {}, serial_id = '' } = item || {};

	return (
		<div>
			<div className={styles.font_wt_600}>
				Shipment ID #
				{' '}
				{serial_id || ''}
			</div>

			<div className={styles.tooltip_container}>
				<Tooltip content={service_provider?.business_name} placement="bottom" interactive>
					<div className={cl`${styles.service_provider} ${styles.tooltip_text}`}>
						{service_provider?.business_name}
					</div>
				</Tooltip>
			</div>

			<div className={styles.tooltip_container}>
				<Tooltip content={shipping_line?.business_name} placement="bottom" interactive>
					<div className={cl`${styles.shipping_line} ${styles.tooltip_text}`}>
						<span className={styles.font_wt_600}>Line:</span>
						{' '}
						{shipping_line?.business_name}
					</div>
				</Tooltip>
			</div>

			{lastmile_ops?.name ? (
				<div className={styles.last_mile}>
					{`LASTMILE OPS : ${lastmile_ops?.name}`}
				</div>
			) : null}
		</div>
	);
}
export default ShipmentInfo;
