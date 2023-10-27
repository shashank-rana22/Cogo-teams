import { isEmpty } from '@cogoport/utils';
import React from 'react';

import ProgressBar from './ProgressBar';
import styles from './styles.module.css';

function ProgreeBars(props) {
	const { kam_progress, manager_progress } = props;

	return (
		<div className={styles.container}>

			{!isEmpty(manager_progress) ? (
				<div className={styles.bar_container}>
					<div className={styles.title}>Team Score</div>
					<ProgressBar progressData={manager_progress} />
				</div>
			) : null}

			{!isEmpty(kam_progress) ? (
				<div className={styles.bar_container}>
					<div className={styles.title}>Your Score</div>
					<ProgressBar progressData={kam_progress} />
				</div>
			) : null}

		</div>
	);
}

export default React.memo(ProgreeBars);
