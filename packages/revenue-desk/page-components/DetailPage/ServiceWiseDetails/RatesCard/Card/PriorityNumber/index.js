import styles from './styles.module.css';

function PriorityNumber({ data, id, showPriority }) {
	const searchObject = (data || []).find((obj) => obj?.rate_id === id);

	let priority = null;
	if (searchObject) {
		priority = (data || []).indexOf(searchObject);
	}

	const show = priority !== null && priority !== -1;

	return (
		<div
			className={styles.container}
			style={{ background: show ? '#4F4F4F' : null }}
		>
			{show && showPriority ? <div className={styles.text}>{priority + 1}</div> : null}
		</div>
	);
}
export default PriorityNumber;
