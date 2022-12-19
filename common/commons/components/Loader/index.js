import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.container}>
			<div className={styles.loader_bar} />
		</div>
	);
}

export default Loader;
