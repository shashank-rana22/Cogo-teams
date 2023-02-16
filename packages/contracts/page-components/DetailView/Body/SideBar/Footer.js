import styles from './styles.module.css';

const serviceToUnit = {
	fcl_freight : 'ctr',
	lcl_freight : 'CBM',
	air_freight : 'Kgs',
};

function Footer({ statsData, index, portPair }) {
	return (
		<div className={styles.footer}>
			<div className={styles.agent}>
				<div className={styles.label}>Overseas Agent</div>
				<div className={styles.value}>
					{statsData?.port_pairs_data?.[index]?.overseas_agent?.short_name
						? statsData?.port_pairs_data?.[index]?.overseas_agent?.short_name
						: '-'}
				</div>
			</div>
			<div className={styles.sub_container}>
				<div className={styles.label}>Fulfilment</div>
				<div className={styles.value}>
					{statsData?.port_pairs_data?.[index]?.fulfilment}
					%
				</div>
			</div>
			<div className={styles.sub_container}>
				<div className={styles.label}>Rate</div>
				<div className={styles.value}>
					{statsData?.port_pairs_data?.[index]?.price
						? `$ ${statsData?.port_pairs_data?.[index]?.price.toFixed(2)}/ 
						${serviceToUnit[portPair?.service_type]} ` : '-'}
				</div>
			</div>
			<div className={styles.sub_container}>
				<div className={styles.label}>Profitability</div>
				<div className={styles.value}>
					{statsData?.port_pairs_data?.[index]?.profitability
						? `${statsData?.port_pairs_data?.[index]?.profitability.toFixed(2)} %` : '-'}
				</div>
			</div>
		</div>
	);
}
export default Footer;
