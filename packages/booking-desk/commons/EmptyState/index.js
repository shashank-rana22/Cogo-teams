import styles from './styles.module.css';

const SRC = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man';

export default function EmptyState() {
	return (
		<div className={styles.container}>
			<div>
				<h1 className={styles.header}>No Shipments Found!</h1>
				<h3>Unfortunately, it seems that no results were found...</h3>
			</div>

			<img
				src={SRC}
				alt="empty_page"
				height="44%"
				width="44%"
			/>
		</div>
	);
}
