import React from 'react';

import styles from './styles.module.css';

function ProgressLine({ progress }) {
	const percentage = 100 - progress;
	return (
		<div className={styles.parent_div}>
			<div className={styles.child_div} style={{ width: progress }}>
				<div className={styles.progress_text}>
					{percentage.toFixed(2) }
					%
				</div>
			</div>
		</div>
	);
}

export default ProgressLine;
