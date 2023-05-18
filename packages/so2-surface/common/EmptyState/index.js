import styles from './styles.module.css';

export default function EmptyState() {
	const src = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man';
	return (
		<div className={styles.container}>
			<div>
				<h1 className={styles.header}>No Shipments found !!</h1>
				<h3>Looks like no results were found...</h3>
			</div>
			<img
				src={src}
				alt="empty_page"
				height="50%"
				width="50%"
			/>
		</div>
	);
}
