import styles from './styles.module.css';

function EmptyState({ type = '' }) {
	const renderEmpty = () => {
		switch (type) {
			case 'profile':
				return (
					<div className={styles.content}>
						<div>
							{/* <img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/org-empty.svg"
								alt=""
								width="100px"
								height="100px"
							/> */}
							<div className={styles.title}>You don&apos;t have profile details for this user</div>
						</div>
					</div>
				);
			case 'organization':
				return (
					<div className={styles.content}>
						<div>
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/org-empty.svg"
								alt=""
								width="100px"
								height="100px"
							/>
							<div className={styles.title}>No organisation details found</div>
						</div>
					</div>
				);
			case 'activities':
				return (
					<div className={styles.content}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/activities-empty.svg"
							alt=""
							width="100px"
							height="100px"
						/>
						<div className={styles.title}>
							You have no activities right now.
							Come back later
						</div>
					</div>
				);
			case 'reminder':
				return (
					<div className={styles.content}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/reminder-empty.svg"
							alt=""
							width="100px"
							height="100px"
						/>
						<div className={styles.title}>No previous reminder found</div>
					</div>
				);
			case 'notes':
				return (
					<div className={styles.content}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/notes-empty.svg"
							alt=""
							width="100px"
							height="100px"
						/>
						<div className={styles.title}>No previous notes found</div>
					</div>
				);
			case 'insights':
				return (
					<div className={styles.content}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/insights.svg"
							alt=""
							width="100px"
							height="100px"
						/>
						<div className={styles.title}>No customer insights found</div>
					</div>
				);
			default:
				return null;
		}
	};
	return (
		<div className={styles.empty_state}>{renderEmpty()}</div>
	);
}
export default EmptyState;
