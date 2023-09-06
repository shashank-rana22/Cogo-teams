import { Button, ProgressBar, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import ApplyLeave from '../../../common/ApplyLeave';

import styles from './styles.module.css';

const MAX = 100;

function LeaveBalancesComponent({
	data = {}, refetch = () => {},
	loading = false, refetchLeaves = () => {},
}) {
	const [openLeaveModal, setOpenLeaveModal] = useState(false);

	const {
		available_privilege_leaves,
		approved_privilege_leaves,
		available_sick_leaves,
		approved_sick_leaves,
		available_casual_leaves,
		approved_casual_leaves,
	} = data || {};

	const progressBar = (available, used) => (available / (available + used)) * MAX;

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
				{loading ? <Placeholder height="60px" width="100%" margin="0px 0px 20px 0px" /> : (
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
							<div className={styles.used_balance}>
								{approved_privilege_leaves}
								{' '}
								Used
							</div>
						</div>
						<ProgressBar className={styles.previlege_progress} progress={PROGRESS_PL} />
					</div>
				)}

				{loading ? <Placeholder height="60px" width="100%" margin="0px 0px 20px 0px" /> : (
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
							<div className={styles.used_balance}>
								{' '}
								{approved_sick_leaves}
								{' '}
								Used
							</div>
						</div>
						<ProgressBar className={styles.previlege_progress} progress={PROGRESS_SL} />
					</div>
				)}
				{loading ? <Placeholder height="60px" width="100%" margin="0px 0px 20px 0px" /> : (
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
							<div className={styles.used_balance}>
								{' '}
								{approved_casual_leaves}
								{' '}
								Used
							</div>
						</div>
						<ProgressBar className={styles.previlege_progress} progress={PROGRESS_CL} />
					</div>
				)}
				<div className={styles.button_ctn}>
					<Button size="lg" themeType="accent" onClick={() => setOpenLeaveModal(true)}>Apply Leave</Button>
				</div>
			</div>
			{ openLeaveModal && (
				<ApplyLeave
					show={openLeaveModal}
					onClose={() => setOpenLeaveModal(false)}
					data={data}
					refetch={refetch}
					refetchList={refetchLeaves}
				/>
			) }
		</div>
	);
}

export default LeaveBalancesComponent;
