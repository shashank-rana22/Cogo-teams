import styles from './styles.module.css';

function LoaderModal({ watchCN = '' }) {
	return (
		<div className={styles.container}>
			<h4>Please Select CN Number</h4>
			{watchCN && (
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/tridot-loading-animated.svg"
					alt="dots"
					style={{ width: 60, height: 50 }}
				/>
			)}
		</div>
	);
}

export default LoaderModal;
