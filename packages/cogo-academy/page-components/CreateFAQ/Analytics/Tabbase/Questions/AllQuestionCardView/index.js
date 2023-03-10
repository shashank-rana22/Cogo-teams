import styles from './styles.module.css';

function AllQuestionCardView() {
	return (
		<div className={styles.container}>
			<div className={styles.primary_right}>
				<div className={styles.active_users}>
					<div>
						Topic from which Most
						Questions viewed

					</div>
					<div className={styles.right_stat_content}>
						<div className={styles.right_stat_label}>
							Topic from which Most
							Questions viewed
						</div>
					</div>
					<div className={styles.right_stat_content}>
						<div className={styles.right_stat_label}>
							Customer Support
						</div>
					</div>
				</div>
			</div>
		</div>

	);
}

export default AllQuestionCardView;
