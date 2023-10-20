import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

const THREE = 3;

function StepCircle({ current_step }) {
	if (current_step === GLOBAL_CONSTANTS.one) {
		return (
			<div className={styles.pie_chart_one}>
				<div className={styles.slice} />
			</div>
		);
	}
	if (current_step === GLOBAL_CONSTANTS.two) {
		return (
			<div className={styles.pie_chart_two}>
				<div className={styles.slice} />
				<div className={styles.slice} />
			</div>
		);
	}
	if (current_step === THREE) {
		return (
			<div className={styles.pie_chart_three}>
				<div className={styles.slice} />
				<div className={styles.slice} />
			</div>
		);
	}
}

export default StepCircle;
