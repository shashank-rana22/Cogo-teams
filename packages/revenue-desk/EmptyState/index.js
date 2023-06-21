import styles from './styles.module.css';

export default function EmptyState({ isSmall = false, heading = '' }) {
	const src = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man';
	return (
		<div className={!isSmall ? styles.container : styles.small_container}>
			{!heading ? (
				<div>
					<h1 className={styles.header}>No SIds found !!</h1>
					<h3>Looks like no results were found...</h3>
				</div>
			) : (
				<div className={styles.heading}>
					{heading}
				</div>
			) }

			{
				isSmall
					? (
						<img
							src={src}
							alt="empty_page"
							height="15%"
							width="15%"
						/>
					) : (
						<img
							src={src}
							alt="empty_page"
							height="50%"
							width="50%"
						/>
					)
			}
		</div>
	);
}
