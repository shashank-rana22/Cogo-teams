import styles from './styles.module.css';

function ViewCards({ cardHeading = '', subHeading = [] }) {
	return (

		<div className={styles.primary_right}>
			<div className={styles.active_users}>
				<div className={styles.right_stat_content}>
					<div className={styles.right_stat_label}>
						{cardHeading}
					</div>
				</div>
				<div className={styles.sub_heading} style={{ color: '#6FA5AB' }}>
					<div>
						<div className={styles.sub_heading_context}>{subHeading[0]?.name}</div>
						{subHeading[0]?.views}
						{' '}
						Views
						,
						{subHeading[0]?.view_percentage}
						%
					</div>
					<div>
						<div className={styles.sub_heading_context}>{subHeading[1]?.name}</div>
						{subHeading[1]?.views}
						{' '}
						Views
						,
						{subHeading[1]?.view_percentage}
						%

					</div>
				</div>

			</div>
		</div>

	);
}

export default ViewCards;
