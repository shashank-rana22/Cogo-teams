import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function IsEvaluated({ is_evaluated = false }) {
	return (
		<Tooltip
			content={is_evaluated ? 'Test is not published yet' : 'Assign Marks to view details'}
			placement="bottom"
		>
			<div className={styles.not_evaluated}>Pending</div>
		</Tooltip>
	);
}
export default IsEvaluated;
