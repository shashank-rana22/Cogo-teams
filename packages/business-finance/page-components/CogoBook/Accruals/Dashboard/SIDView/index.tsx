import { IcMArrowRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SIDView({ reportMonth }) {
	return (
		<div className={styles.container}>
			<div className={styles.shipment_days}>
				Days Left For Shipment ID’s
				<br />
				To Get Auto Reversed
			</div>
			<div className={styles.days_data}>
				{reportMonth.map((item) => (
					<div key={item?.id}>
						<div className={styles.days_left}>
							{item?.days}
							{' '}
							-
							<IcMArrowRight />
						</div>
						<div className={styles.id_show}>
							<div className={styles.id_data}>Shipment ID’s</div>
							:
							<div className={styles.id_color_data}>{item?.shipmentId}</div>
						</div>
					</div>
				))}
			</div>

		</div>
	);
}
export default SIDView;
