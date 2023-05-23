import { startCase } from '@cogoport/utils';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import ClickableDiv from '../../../../../commons/clickableDiv';

import ShipmentTimeline from './ShipmentTimeline';
import styles from './styles.module.css';

const optionsMapping = [
	{
		title : 'Cutoff Tracking',
		name  : 'cutoff_tracking',
	},
];

function Accordion() {
	const [nav, setNav] = useState('cutoff_tracking');

	return (
		<div className={styles.container}>
			<div className={styles.left_nav_bar}>
				{optionsMapping.map((item) => (
					<ClickableDiv
						key={uuid()}
						className={nav === item?.name ? styles.active : styles.options}
						onClick={() => setNav(item.name)}
					>
						{item.title}
					</ClickableDiv>
				))}

				<div className={styles.options} />
			</div>

			<div className={styles.body}>
				<div className={styles.heading}>{startCase(nav)}</div>

				<div className={styles.content}>
					<div className={styles.details}>
						<div className={styles.booking_note}>
							<div className={styles.label}>Booking Note:</div>

							<div className={styles.bn_number}>BN22001KF4496</div>
						</div>

						<div className={styles.label}>
							No. of Containers:
							{'  '}
							<b>10</b>
						</div>
					</div>

				</div>

				<div className={styles.shipment_timeline}>
					<ShipmentTimeline nav={nav} />
				</div>
			</div>
		</div>
	);
}

export default Accordion;
