import styles from './styles.module.css';

function ActivityIndicator() {
	return (
		<div className={styles.container}>
			<h4>
				SME Owners,
				<br />
				{' '}
				Your Teams are progressing really well
			</h4>

			<div className={styles.info_cards_container}>
				<div className={styles.info_card}>
					<h1>5</h1>
					<p>New SIDs Created</p>
				</div>

				<div className={styles.info_card}>
					<h1>1</h1>
					<p>New Activation</p>
				</div>
			</div>

		</div>

	);
}

export default ActivityIndicator;
