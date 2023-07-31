import { Button, ProgressBar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import styles from './styles.module.css';

function LeaveBalancesComponent() {
	const [progress, setProgress] = useState('60');
	setProgress('60');

	const { image_url } = GLOBAL_CONSTANTS || {};
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.header_text}>LEAVE BALANCES</div>
				<div className={styles.header_text1}>These are your leave balances</div>
			</div>
			<div className={styles.leaves_cotegory_body}>
				<div className={styles.leave_ctn}>
					<div className={styles.leave_icon_ctn}>
						<img
							src={image_url.previlege_leave_icon}
							alt="loading"
						/>
						<div className={styles.leaves_text}>Privilege Leave</div>
					</div>
					<div className={styles.text2}>
						<div>2 available</div>
						<div> 1 Used</div>
					</div>
					<div>
						<ProgressBar progress={progress} />
					</div>
				</div>
				<div className={styles.leave_ctn}>
					<div className={styles.leave_icon_ctn}>
						<img
							src={image_url.sick_leave_icon}
							alt="loading"
						/>
						<div className={styles.leaves_text}>Sick Leave</div>
					</div>
					<div className={styles.text2}>
						<div>2 available</div>
						<div> 1 Used</div>
					</div>
					<div>
						<ProgressBar progress={progress} />
					</div>
				</div>
				<div className={styles.last_leave_ctn}>
					<div className={styles.leave_icon_ctn}>
						<img
							src={image_url.casual_leave_icon}
							alt="loading"
						/>
						<div className={styles.leaves_text}>Casual Leave</div>
					</div>
					<div className={styles.text2}>
						<div>2 available</div>
						<div> 1 Used</div>
					</div>
					<div>
						<ProgressBar progress={progress} />
					</div>
				</div>
				<div className={styles.button_ctn}>
					<Button size="lg" themeType="accent">Apply Leave</Button>
				</div>
			</div>
		</div>
	);
}

export default LeaveBalancesComponent;
