import styles from './styles.module.css';

function Toggler({ item }) {
	return (
		<div>
			{item?.source === 'manual' ? (
				<div className={styles.manual_container}>Manual Upload</div>
			) : (
				<div className={styles.system_container}>System Upload</div>
			)}
		</div>
	);
}

export default Toggler;
