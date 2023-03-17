import styles from './styles.module.css';

function ViewCards({ cardHeading = '', subHeading = [] }) {
	const truncate = (str) => (str?.length > 12 ? `${str.substring(0, 10)}...` : str);

	return (
		<div className={styles.primary_right}>
			<div className={styles.right_stat_content}>
				<div className={styles.right_stat_label}>
					{cardHeading}
				</div>
			</div>

			<div className={styles.sub_heading} style={{ color: '#6FA5AB' }}>
				<div>
					<div className={styles.sub_heading_context}>
						{truncate(subHeading[0]?.topic_name)}

					</div>
					{subHeading[0]?.topic_views}
					{' '}
					Views
					,
					{subHeading[0]?.view_percentage}
					%
				</div>

				<div>
					<div className={styles.sub_heading_context}>{truncate(subHeading[1]?.topic_name)}</div>
					{subHeading[1]?.topic_views}
					{' '}
					Views
					,
					{subHeading[1]?.view_percentage}
					%
				</div>
			</div>
		</div>

	);
}

export default ViewCards;
