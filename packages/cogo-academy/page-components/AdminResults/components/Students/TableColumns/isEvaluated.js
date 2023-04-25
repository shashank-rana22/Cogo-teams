import { Tooltip } from '@cogoport/components';

import styles from '../styles.module.css';

function IsEvaluated({ is_evaluated = false }) {
	if (is_evaluated) {
		return (
			<Tooltip content="Test is not yet published" placement="bottom">
				<div className={styles.not_evaluated}>Pending</div>
			</Tooltip>
		);
	}

	return (
		<Tooltip content="Assign Marks to view details" placement="bottom">
			<div className={styles.not_evaluated}>Pending</div>
		</Tooltip>
	);
}
export default IsEvaluated;
