import React from 'react';

import DeskView from './DeskView';
import styles from './styles.module.css';

function ControlledBooking() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Controlled Booking Desk
			</div>
			<DeskView />
		</div>

	);
}

export default ControlledBooking;
