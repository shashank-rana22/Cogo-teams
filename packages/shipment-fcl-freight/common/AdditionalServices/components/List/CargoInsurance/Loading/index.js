import styles from './styles.modules.css';

function Loading() {
	return (
		<div className={styles.loader_wrapper}>
			<div className={styles.text}>Please wait while we fetch Details!!</div>
			{' '}
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/loading-cargo-insurance.svg"
				alt=" loading details"
			/>
		</div>
	);
}
export default Loading;
