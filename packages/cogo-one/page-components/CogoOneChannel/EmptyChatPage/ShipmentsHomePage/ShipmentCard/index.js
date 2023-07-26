import { Pill } from '@cogoport/components';
import React from 'react';

import HeaderBlock from './HeaderBlock';
import styles from './styles.module.css';

function ShipmentCard({ shipmentItem = {} }) {
	const { service_provider = {} } = shipmentItem;
	const { bussiness_name, short_name } = service_provider;

	return (
		<div className={styles.container}>
			<div className={styles.main_block}>
				<HeaderBlock shipmentItem={shipmentItem} />
				<div className={styles.service_provider_details}>
					{bussiness_name || short_name}
				</div>
			</div>

			<div className={styles.footer_block}>
				<div className={styles.footer_left_block}>
					<Pill
						size="md"
						color="#4BAE4F"
					>
						Booking Placed
					</Pill>
				</div>

				<div className={styles.footer_right_block}>
					Next: Booking Confirmation
				</div>
			</div>
		</div>
	);
}

export default ShipmentCard;
