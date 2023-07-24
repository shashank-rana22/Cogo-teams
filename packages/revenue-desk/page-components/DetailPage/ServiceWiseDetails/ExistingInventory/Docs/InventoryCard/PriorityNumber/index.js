import { VALUE_ZERO, INCREMENT_VALUE } from '../../../../../../constants';

import styles from './styles.module.css';

function PriorityNumber({ data, id }) {
	const searchObject = (data || []).find((obj) => obj?.id === id);

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
			{show ? <div className={styles.text}>{priority + INCREMENT_VALUE}</div> : null}
		</div>
	);
}
export default PriorityNumber;
