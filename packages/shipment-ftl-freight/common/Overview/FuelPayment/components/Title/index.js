import React from 'react';

import styles from './styles.module.css';

function Title() {
	return (
		<div>
			<div className={styles.title}>Trigger Fuel Payment</div>
			<div className={styles.message}>
				This will trigger after Upload Cogoport LR task and Load Truck Image Upload task
				(valid for only single truck)
			</div>
		</div>
	);
}

export default Title;
