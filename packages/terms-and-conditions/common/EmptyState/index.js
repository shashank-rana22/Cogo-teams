import { IcMTaskNotCompleted } from '@cogoport/icons-react';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<IcMTaskNotCompleted />

			<p className={styles.empty}>
				Terms And Condition(s) are not present.
			</p>
		</div>
	);
}

export default EmptyState;
