import styles from './styles.module.css';

const NoDataImage = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no result.svg';

function EmptyState() {
	return (
		<div className={styles.container}>
			<img
				className={styles.img_height}
				src={NoDataImage}
				alt="No Data"
			/>
			<div className={styles.text}>
				<div className={styles.found}>No Results Found</div>
				<div className={styles.border} />
				<div className={styles.msg}> Try adjusting filter to find what you’re looking for.</div>
			</div>

		</div>
	);
}
export default EmptyState;
