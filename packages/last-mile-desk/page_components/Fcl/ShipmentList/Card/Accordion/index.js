import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import ClickableDiv from '../../../../../commons/clickableDiv';

import ShipmentTimeline from './ShipmentTimeline';
import styles from './styles.module.css';

const optionsMapping = [
	{
		title : 'Cutoff Details',
		name  : 'cutoff_details',
	},
	{
		title : 'Cutoff Tracking',
		name  : 'cutoff_tracking',
	},
];

function Accordion() {
	const [nav, setNav] = useState('cutoff_details');
	const [edit, setEdit] = useState(false);

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

					{nav === 'cutoff_details' ? (
						<div className={styles.bttn_wrap}>
							<div style={{ marginRight: '8px' }}>
								<Button
									type="button"
									themeType="secondary"
									size="sm"
									onClick={() => setEdit(!edit)}
								>
									{edit ? 'Cancel' : 'Edit Dates'}
								</Button>
							</div>

							<Button type="button" themeType="accent" size="sm">
								{edit ? 'Update' : 'Mark as Verified'}
							</Button>
						</div>
					) : null}
				</div>

				<div className={styles.shipment_timeline}>
					<ShipmentTimeline edit={edit} nav={nav} />
				</div>
			</div>
		</div>
	);
}

export default Accordion;
