import React from 'react';

import styles from './styles.module.css';

function ProgressLine({ currentPercent, todayDuePercent, overDuePercent }) {
	return (
		<div className={styles.progress_line_container}>
			<div className={styles.progress_line}>
				<div className={styles.progress_bar} style={{ width: `${currentPercent}%` }}>
					<div className={styles.progress_label}>
						{currentPercent}
						%
					</div>
				</div>
				<div className={styles.progress_bar1} style={{ width: `${todayDuePercent}%` }}>
					<div className={styles.progress_label}>
						{todayDuePercent}
						%
					</div>
				</div>
				<div className={styles.progress_bar2} style={{ width: `${overDuePercent}%` }}>
					<div className={styles.progress_label}>
						{overDuePercent}
						%
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProgressLine;
