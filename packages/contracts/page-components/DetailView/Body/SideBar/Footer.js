import styles from './styles.module.css';

function Footer({ statsData, index }) {
	//   const keys = ["id"],
	//     filteredData = (statsData?.port_pair_stats || []).filter(
	//       (
	//         (s) => (o) =>
	//           ((k) => !s.has(k) && s.add(k))(keys.map((k) => o[k]).join("|"))
	//       )(new Set())
	//     );

	// const stats = (statsData?.port_pairs_data || []).map((item) => {
	// 	if (item.id === portPair?.id) {
	// 		return statsData?.port_pairs_data;
	// 	}
	// })[0];

	return (
		<div className={styles.footer}>
			<div className={styles.agent}>
				<div className={styles.label}>Overseas Agent</div>
				<div className={styles.value}>
					{statsData?.port_pairs_data[index]?.overseas_agent?.short_name
						? statsData?.port_pairs_data[index]?.overseas_agent?.short_name
						: '-'}
				</div>
			</div>
			<div className={styles.sub_container}>
				<div className={styles.label}>Fulfilment</div>
				<div className={styles.value}>
					{statsData?.port_pairs_data[index]?.fulfilment}
					%
				</div>
			</div>
			<div className={styles.sub_container}>
				<div className={styles.label}>Rate</div>
				<div className={styles.value}>
					{statsData?.port_pairs_data[index]?.price
						? statsData?.port_pairs_data[index]?.price.toFixed(2) : '-'}
				</div>
			</div>
			<div className={styles.sub_container}>
				<div className={styles.label}>Profitability</div>
				<div className={styles.value}>
					{statsData?.port_pairs_data[index]?.profitability
						? statsData?.port_pairs_data[index]?.profitability.toFixed(2) : '-'}
				</div>
			</div>
		</div>
	);
}
export default Footer;
