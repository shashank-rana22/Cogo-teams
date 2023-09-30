import styles from '../styles.module.css';

export function GetLabelAndValue({ value = '', label = '' }) {
	return (
		<>
			<div className={styles.title}>{label}</div>
			<div className={styles.text}>{value || '-'}</div>
		</>
	);
}
