import styles from './styles.module.css';

const NoDataImage = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no ressult found.svg';
const Success = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Success.png';
function EmptyState({ showEmptyState }) {
	const getEmptyState = () => {
		if (showEmptyState === 'BOOKED') {
			return (
				<div className={styles.container_value}>
					<img
						className={styles.img_height}
						src={Success}
						alt="No Data"
					/>
					<div className={styles.text}>
						<div className={styles.found}>All Shipments Are Booked Now</div>
						<div className={styles.border_value} />
						<div className={styles.msg_value}> Go back to Step - 1 to Book more Shipments</div>
					</div>

				</div>
			);
		} if (showEmptyState === 'ACCRUED') {
			return (
				<div className={styles.container_value}>
					<img
						className={styles.img_height}
						src={Success}
						alt="No Data"
					/>
					<div className={styles.text}>
						<div className={styles.found}>All Shipments Are Accrued Now</div>
						<div className={styles.border_value} />
						<div className={styles.msg_value}> Go back to Step - 1 to Accrue more Shipments</div>
					</div>

				</div>
			);
		}
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
	};
	return (
		getEmptyState()
	);
}
export default EmptyState;
