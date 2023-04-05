import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function LabelValue({ label, value }) {
	return !isEmpty(value) ? (
		<div className={styles.label_value_container}>
			<div className={styles.label}>
				{label}
				{' '}
				:
			</div>
			<div className={styles.value}>{value}</div>
		</div>
	) : null;
}

export default LabelValue;
