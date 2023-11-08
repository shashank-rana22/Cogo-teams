import { ProgressBar } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function StoryPoints() {
	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<img alt="star" src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Vectorstar.svg" />
				Story Points
			</div>
			<div className={styles.progress_flex}>
				<div className={styles.achieved_target}>
					15 Achieved
				</div>
				25
			</div>
			<ProgressBar progress={55} uploadText=" Achieved" />
			<div className={styles.sub_text}>
				You’re doing great👏 14 More days to achieve your target
			</div>
		</div>
	);
}

export default StoryPoints;
