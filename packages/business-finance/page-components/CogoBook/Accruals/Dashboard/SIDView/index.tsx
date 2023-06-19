import { Placeholder } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

interface MonthInterface {
	id?:string
	days?:string
	shipmentId?:string
}
interface SIDViewInterface {
	reportMonth?: Array<MonthInterface>
	shipmentViewLoading?: boolean
}

function SIDView({ reportMonth, shipmentViewLoading }:SIDViewInterface) {
	return (
		<div className={styles.container}>
			<div className={styles.shipment_days}>
				Days Left For Shipment ID’s
				<br />
				To Get Auto Closed
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
							<div className={styles.id_color_data}>
								{ shipmentViewLoading
									? <Placeholder height="20px" width="60px" /> : item?.shipmentId}

							</div>
						</div>
					</div>
				))}
			</div>

		</div>
	);
}
export default SIDView;
