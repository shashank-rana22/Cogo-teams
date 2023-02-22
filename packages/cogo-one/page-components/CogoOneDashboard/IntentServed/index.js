import React from 'react';

import styles from './styles.module.css';

function IntentServed() {
	return (

		<div className={styles.intent_served_box}>
			<div className={styles.heading}>Intent Served</div>
			<div className={styles.sub_section}>
				<div className={styles.numbers}>1,345</div>
				<div className={styles.label}>Normal Conversations</div>
			</div>
			<div className={styles.sub_section}>
				<div className={styles.numbers}>1,345</div>
				<div className={styles.label}>Trade enquiry</div>
			</div>
			<div className={styles.sub_section}>
				<div className={styles.numbers}>1,345</div>
				<div className={styles.label}>Shipment booking</div>
			</div>
			<div className={styles.sub_section}>
				<div className={styles.numbers}>1,345</div>
				<div className={styles.label}>Invoice</div>
			</div>
		</div>

	);
}

export default IntentServed;
