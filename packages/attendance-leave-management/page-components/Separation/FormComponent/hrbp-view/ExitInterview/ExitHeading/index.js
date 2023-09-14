import { Button } from '@cogoport/components';
import { IcMTaskCompleted } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ExitHeading({ title = 'HR MEETING', subTitle = 'Summary from manager interaction' }) {
	return (
		<div className={styles.header}>
			<div className={styles.left_header}>
				<span className={styles.upper_text}>{title}</span>
				<span className={styles.lower_text}>{subTitle}</span>
			</div>

			<div className={styles.logs_button}>
				<Button size="md" themeType="accent">
					<IcMTaskCompleted />
					<span style={{ marginLeft: '4px' }}>Notes & Logs</span>
				</Button>
			</div>
		</div>
	);
}

export default ExitHeading;
