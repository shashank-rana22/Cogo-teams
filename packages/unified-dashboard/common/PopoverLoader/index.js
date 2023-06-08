import styles from './styles.module.css';

function PopoverLoader() {
	return (
		<div className={styles.container}>
			<div className={styles.loading_text}>Fetching... 🚀</div>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-spinner.svg"
				alt="spinner"
				style={{ width: '22px', height: '22px' }}
			/>
		</div>
	);
}

export default PopoverLoader;
