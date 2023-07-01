import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

export default function ShipmentInfo({ item }) {
	return (
		<div className={styles.container}>
			<div className={styles.port_info}>
				<b>{item?.origin_location?.display_name}</b>
				<p>
					ETD:&nbsp;
					{formatDate({
						date       : item?.schedule_departure,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</p>
			</div>

			<div><IcMPortArrow /></div>

			<div className={styles.port_info}>
				<b>{item?.origin_location?.display_name}</b>
				<p>
					ETA:&nbsp;
					{formatDate({
						date       : item?.schedule_arrival,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
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
