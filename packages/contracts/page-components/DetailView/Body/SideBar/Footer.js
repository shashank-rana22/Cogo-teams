import styles from './styles.module.css';

function Footer({statsData}) {
	// const keysToMap = [];
	return (
		<div className={styles.footer}>
			<div>
				<div className={styles.label}>
                Overseas Agent
				</div>
				<div className={styles.value}>
                {statsData?.service_provider_id?.display_name ? statsData?.service_provider_id?.display_name : '-'}
				</div>
			</div>
            <div>
				<div className={styles.label}>
                Fulfilment
				</div>
				<div className={styles.value}>
                {statsData?.fulfilment}
				</div>
			</div>
            <div>
				<div className={styles.label}>
                Rate
				</div>
				<div className={styles.value}>
                {statsData?.rate ? statsData?.rate  : '-'}
				</div>
			</div>
            <div>
				<div className={styles.label}>
                Profitability
				</div>
				<div className={styles.value}>
                {statsData?.profitability ? statsData?.profitability : '-'} 
				</div>
			</div>
		</div>
	);
}
export default Footer;
