import styles from './styles.module.css';

function CogoportTemplate({ from = {} }) {
	return (
		<div className={styles.container}>
			<img
				alt=""
				className={styles.img}
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogoport_top.svg"
			/>
			<div className={styles.best_importer}>
				The best import and export services at one place
			</div>
			<div className={styles.address}>
				<div>
					Ackruti Trade Centre, 6th floor
				</div>
				<div>
					Road No. 7, Marol MIDC, Andheri (East),
				</div>
				<div>
					Maharashtra, Mumbai 400093
				</div>
			</div>
			<div className={styles.sender_info}>
				<div>
					Supply Relation Manager :
					{' '}
					{from?.name}
				</div>
				<div>
					Email :
					{from?.email}
				</div>
				<div>
					Mob :
					{' '}
					{from?.mobile_number}
				</div>
			</div>
		</div>
	);
}

export default CogoportTemplate;
