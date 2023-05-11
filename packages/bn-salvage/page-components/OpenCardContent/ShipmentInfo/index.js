import { IcMPortArrow } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

export default function ShipmentInfo({ item }) {
	return (
		<div className={styles.container}>
			<div className={styles.port_info}>
				<b>{item?.origin_location?.display_name}</b>
				<p>
					ETD:&nbsp;
					{format(item?.schedule_departure, 'dd MMM yyyy')}
				</p>
			</div>

			<div><IcMPortArrow /></div>

			<div className={styles.port_info}>
				<b>{item?.origin_location?.display_name}</b>
				<p>
					ETA:&nbsp;
					{format(item?.schedule_arrival, 'dd MMM yyyy')}
				</p>
			</div>

			<div>
				<p>Commodity</p>
				<b>{startCase(item?.commodity)}</b>
			</div>

			<div>
				<p>Yard Details</p>
				<b>{item?.yard_detail?.display_name}</b>
			</div>
		</div>
	);
}
