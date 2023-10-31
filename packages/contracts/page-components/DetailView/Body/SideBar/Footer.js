import styles from './styles.module.css';

const UNIT_MAPPING = {
	fcl_freight       : 'ctr',
	lcl_freight       : 'CBM',
	air_freight       : 'Kgs',
	fcl_freight_local : 'ctr',
	lcl_freight_local : 'CBM',
};

function Footer({ statsData, index, portPair }) {
	let rateValue;
	if (statsData?.port_pairs_data?.[index]?.price) {
		rateValue = `$ ${statsData?.port_pairs_data?.[index]?.price.toFixed(2)}/ 
    ${UNIT_MAPPING[portPair?.service_type]} `;
	} else if (portPair?.at_actuals) rateValue = '*At Actuals';

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
					{rateValue || '-'}
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
