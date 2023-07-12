import { INCREMENT_BY_ONE, VALUE_ZERO } from '../../../../../constants';

import styles from './styles.module.css';

function PriorityNumber({ data, id, showPriority, validity_id }) {
	const searchObject = (data || []).find((obj) => obj?.rate_id === id && obj?.validity_id === validity_id);

	let priority;
	if (searchObject) {
		priority = (data || []).indexOf(searchObject);
	}

	const show = priority >= VALUE_ZERO;

	return (
		<div
			className={styles.container}
			style={{ background: show ? '#4F4F4F' : null }}
		>
			{show && showPriority
				? <div className={styles.text}>{priority + INCREMENT_BY_ONE}</div> : <div className={styles.text} />}
		</div>
	);
}
export default PriorityNumber;
