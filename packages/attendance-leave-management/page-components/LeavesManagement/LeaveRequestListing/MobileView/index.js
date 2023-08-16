import React from 'react';

import styles from './styles.module.css';

function MobileView() {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.flex}>
					<div className={styles.leave_count}>
						10
						<span>
							day
						</span>
					</div>
					<div className={styles.leave_dates}>
						<div className={styles.leave_type}>
							Privilege leave
						</div>
						<div className={styles.dates}>
							31/03/23 - 1/04/23
						</div>
					</div>
				</div>
				<div className={styles.leave_status}>
					<div className={styles.leave_dot} />
					<div className={styles.leave_status_text}>
						Pending
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.flex}>
					<div className={styles.leave_count}>
						10
						<span>
							day
						</span>
					</div>
					<div className={styles.leave_dates}>
						<div className={styles.leave_type}>
							Privilege leave
						</div>
						<div className={styles.dates}>
							31/03/23 - 1/04/23
						</div>
					</div>
				</div>
				<div className={styles.leave_status}>
					<div className={styles.leave_dot} />
					<div className={styles.leave_status_text}>
						Pending
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.flex}>
					<div className={styles.leave_count}>
						10
						<span>
							day
						</span>
					</div>
					<div className={styles.leave_dates}>
						<div className={styles.leave_type}>
							Privilege leave
						</div>
						<div className={styles.dates}>
							31/03/23 - 1/04/23
						</div>
					</div>
				</div>
				<div className={styles.leave_status}>
					<div className={styles.leave_dot} />
					<div className={styles.leave_status_text}>
						Pending
					</div>
				</div>
			</div>
		</div>
	);
}

export default MobileView;
