import { Button, ProgressBar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import React, { useState } from 'react';

import useGetEmployeeLeaveBalances from '../../../hooks/useGetEmployeeLeaveBalances';

import styles from './styles.module.css';

const MAX = 100;

function LeaveBalancesComponent() {
	// const [progress, setProgress] = useState('60');
	const { data } = useGetEmployeeLeaveBalances();
	const {
		available_privilege_leaves,
		approved_privilege_leaves,
		available_sick_leaves,
		approved_sick_leaves,
		available_casual_leaves,
		approved_casual_leaves,
	} = data || {};

	const progressBar = (available, used) => (available / (available + used)) * MAX;
	console.log(progressBar);

	const PROGRESS_PL = progressBar(available_privilege_leaves, approved_privilege_leaves);
	const PROGRESS_SL = progressBar(available_sick_leaves, approved_sick_leaves);
	const PROGRESS_CL = progressBar(available_casual_leaves, approved_casual_leaves);
	const { image_url } = GLOBAL_CONSTANTS || {};
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.header_text}>LEAVE BALANCES</div>
				<div className={styles.header_text1}>These are your leave balances</div>
			</div>
			<div className={styles.leaves_cotegory_body}>
				<div className={styles.leave_ctn_privilege}>
					<div className={styles.leave_icon_ctn}>
						<img
							src={image_url.previlege_leave_icon}
							alt="loading"
						/>
						<div className={styles.leaves_text}>Privilege Leave</div>
					</div>
					<div className={styles.text2}>
						<div>
							{available_privilege_leaves}
							{' '}
							available
						</div>
						<div>
							{approved_privilege_leaves}
							{' '}
							Used
						</div>
					</div>
					<ProgressBar className={styles.previlege_progress} progress={PROGRESS_PL} />
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
						<div>
							{available_sick_leaves}
							{' '}
							available
						</div>
						<div>
							{' '}
							{approved_sick_leaves}
							{' '}
							Used
						</div>
					</div>
					<ProgressBar progress={PROGRESS_SL} />
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
						<div>
							{available_casual_leaves}
							{' '}
							available
						</div>
						<div>
							{' '}
							{approved_casual_leaves}
							{' '}
							Used
						</div>
					</div>
					<ProgressBar progress={PROGRESS_CL} />
				</div>
				<div className={styles.button_ctn}>
					<Button size="lg" themeType="accent">Apply Leave</Button>
				</div>
			</div>
		</div>
	);
}

export default LeaveBalancesComponent;
