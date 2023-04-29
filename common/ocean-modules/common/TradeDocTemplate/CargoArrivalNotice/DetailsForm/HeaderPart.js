import styles from './styles.module.css';

export function HeaderPart() {
	return (
		<>
			<div className={styles.company_name}>
				COGO FREIGHT PRIVATE LIMITED (COGOPORT)
			</div>
			<div className={styles.text_mt2_center}>
				Door no. T-6 Pinnacle Business Park Mahakali Caves Road
			</div>
			<div className={styles.text_mt2_center}>
				Shanti Nagar Andheri East, MUMBAI - 400093 India.
			</div>
			<div className={styles.text_mt2_center}>
				GST No :27AAGCC4470P1Z5
			</div>
			<div className={styles.text_mt2_center}>
				CIN No: U60222MH2016PTC28059
			</div>
			<div className={styles.arrival_notice}>
				CARGO ARRIVAL NOTICE
			</div>
		</>
	);
}
