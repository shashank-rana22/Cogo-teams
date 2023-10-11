import {
	IcMCalendar,
	IcMClock,
	IcMDummyCircle,
	IcMEmail,
	IcMProfile,
	IcMCall,
} from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ShipmentProgress({ cardData = {} }) {
	const { assigned_to = {} } = cardData || {};

	return (
		<div className={styles.container}>
			<div className={styles.contact_info}>
				<span className={styles.label}>
					Contacted At:
				</span>

				<IcMCalendar className={styles.icon_styles} />

				<span className={styles.primary_data}>
					14/09/23
				</span>

				<IcMClock className={styles.icon_styles} />

				<span className={styles.primary_data}>
					04:00 pm
				</span>
			</div>

			<div className={styles.contact_info}>
				<span className={styles.label}>
					Revert Status:
				</span>

				<span className={styles.primary_data}>
					No reply
				</span>

				<IcMDummyCircle className={styles.dummy_circle} />

				<IcMEmail className={styles.icon_styles} fill="#EE3425" />

				<span className={styles.secondary_data}>
					34m ago
				</span>
			</div>

			<div className={styles.contact_info}>
				<span className={styles.label}>
					Agent :
				</span>

				<IcMProfile className={styles.icon_styles} />

				<span className={styles.primary_data}>
					{assigned_to?.name || ''}
				</span>

				<IcMDummyCircle className={styles.dummy_circle} />

				<IcMCall className={styles.icon_styles} fill="#849E4C" />

				<span className={styles.secondary_data}>
					Contacted 10m ago
				</span>
			</div>
		</div>
	);
}

export default ShipmentProgress;
