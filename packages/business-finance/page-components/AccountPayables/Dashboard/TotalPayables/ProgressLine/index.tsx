import React from 'react';

import styles from './styles.module.css';

function ProgressLine({ currentPercent, todayDuePercent, overDuePercent }) {
	const PERCENTAGE_MAPPING = [
		{
			label      : 'progress_bar',
			percentage : currentPercent,
			color      : '#67c676',
		},
		{
			label      : 'progress_bar1',
			percentage : todayDuePercent,
			color      : '#f68b21',
		},
		{
			label      : 'progress_bar2',
			percentage : overDuePercent,
			color      : '#ed3726',
		},
	];
	return (
		<div className={styles.progress_line_container}>
			<div className={styles.progress_line}>
				{PERCENTAGE_MAPPING.map((item) => (
					<div
						className={styles.progress_bar}
						style={{
							width           : `${item?.percentage}%`,
							backgroundColor : `${item?.color}`,
						}}
					>
						<div className={styles.progress_label}>
							{item?.percentage}
							%
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ProgressLine;
