import styles from './styles.module.css';

export default function EmptyState({
	heading = 'No Shipments found !!',
	subHeading = 'Looks like no results were found...',
}) {
	const src = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man';
	return (
		<div className={styles.container}>
			<div>
				<h1 className={styles.header}>{heading}</h1>
				<h3>{subHeading}</h3>
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
