import styles from './styles.module.css';

function IncompletionReasons({ completionMessages }) {
	const reasons = Object.keys(completionMessages || {}).map((key) => (
		<li key={key}>{`${key} ${completionMessages[key]}`}</li>
	));
	return completionMessages ? (
		<div className={styles.container}>
			<div className={styles.heading}>Incompletion reasons :</div>
			<ul className={styles.ul}>{reasons}</ul>
		</div>
	) : null;
}
export default IncompletionReasons;
