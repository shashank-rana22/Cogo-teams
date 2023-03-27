import styles from './styles.module.css';

export default function EmptyState() {
	const src = 'http://www.wallpaperg.com/uploads/upl7/1374819592-funny-boy-file-www.wallpaperg.com.gif';
	return (
		<div className={styles.container}>
			<div>
				<h1 className={styles.header}>No Shipments found !!</h1>
				<h3>Looks like no results were found...</h3>
			</div>

			<img
				src={src}
				alt="empty_page"
			/>
		</div>
	);
}
