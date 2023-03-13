import styles from './styles.module.css';

function ViewCards({ cardHeading = '' }) {
	return (

		<div className={styles.primary_right}>
			<div className={styles.active_users}>
				<div className={styles.right_stat_content}>
					<div className={styles.right_stat_label}>
						{cardHeading}
					</div>
				</div>
				<div className={styles.subHeading} style={{ color: '#6FA5AB' }}>
					<div>
						<div className={styles.subHeadingContext}>Shipment</div>
						140 Views,40%
					</div>
					<div>
						<div className={styles.subHeadingContext}>Import</div>
						112 Views,28%

					</div>
				</div>

			</div>
		</div>

	);
}

export default ViewCards;
