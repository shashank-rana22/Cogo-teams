import styles from './styles.module.css';

const ZERO = 0;
function Toggler({ data }) {
	return (
		<div>
			{data?.[ZERO]?.source === 'manual' ? (
				<div className={styles.manual_container}>Manual Upload</div>
			) : (
				<div className={styles.system_container}>System Upload</div>
			)}
		</div>
	);
}

export default Toggler;
