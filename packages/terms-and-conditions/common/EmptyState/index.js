import { IcMTaskNotCompleted } from '@cogoport/icons-react';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<IcMTaskNotCompleted />

			<p style={{ color: '#393f70', fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
				Terms And Condition(s) are not present.
			</p>
		</div>
	);
}

export default EmptyState;
