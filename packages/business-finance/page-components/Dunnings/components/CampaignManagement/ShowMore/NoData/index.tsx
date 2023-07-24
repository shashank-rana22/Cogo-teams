import styles from './styles.module.css';

function NoData() {
	return (
		<div className={styles.empty_container}>
			<div>
				<h1 className={styles.no_data_text}>
					No data to show
				</h1>

			</div>
		</div>
	);
}

export default NoData;
