import { Button } from '@cogoport/components';
import {
	IcMEmail,
	IcMCall,
} from '@cogoport/icons-react';
import React from 'react';

import ServiceProviderDetails from './ServiceProviderDetails';
import ShipmentDetails from './ShipmentDetails';
import ShipmentProgress from './ShipmentProgress';
import styles from './styles.module.css';

function RateRevertCard({ cardData = {} }) {
	return (
		<div className={styles.container}>
			<ServiceProviderDetails cardData={cardData} />
			<ShipmentDetails cardData={cardData} />
			<ShipmentProgress cardData={cardData} />
			<div className={styles.card_footer}>
				<div className={styles.expiry_time}>
					10:09 m left
				</div>
				<div className={styles.actions_container}>
					<Button size="md" themeType="secondary" className={styles.icon_buttons}>
						<IcMCall className={styles.call_icon} />
					</Button>
					<Button size="md" themeType="secondary" className={styles.icon_buttons}>
						<IcMEmail className={styles.email_icon} />
					</Button>
					<Button size="md" themeType="secondary">
						+ Verify And Add Rate
					</Button>
				</div>
			</div>
		</div>
	);
}

export default RateRevertCard;
