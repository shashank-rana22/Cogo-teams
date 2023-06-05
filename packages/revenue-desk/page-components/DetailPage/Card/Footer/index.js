import styles from './styles.module.css';

function Footer({ data }) {
	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<div className={styles.text}>
					Cargo Readiness Date :
					<span style={{ fontWeight: '400' }}>
						12 Aug 2023
					</span>
				</div>
				<div className={styles.text}>
					Expected Departure Date :
					<span style={{ fontWeight: '400' }}>
						18 Aug 2023
					</span>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.section}>
				<div className={styles.text}>
					KAM :
					<span style={{ fontWeight: '400' }}>
						Quotation
					</span>
				</div>
				<div className={styles.text}>
					SO1 :
					<span style={{ fontWeight: '400' }}>
						Factory
					</span>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.section}>
				<div className={styles.text}>
					Shipment Source :
					<span style={{ fontWeight: '400' }}>
						Quotation
					</span>
				</div>
				<div className={styles.text}>
					Stuffing Location :
					<span style={{ fontWeight: '400' }}>
						Factory
					</span>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.section}>
				<div className={styles.text}>
					Preferred Shipping Line :
					<span style={{ fontWeight: '400' }}>
						Maersk
					</span>
				</div>
				<div className={styles.text}>
					Shipping Line :
					<span style={{ fontWeight: '400' }}>
						Maersk
					</span>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.section}>
				<div className={styles.text}>
					Exchange Rate :
					<span style={{ fontWeight: '400' }}>
						82.98
					</span>
				</div>
				<div className={styles.text}>
					Transit Days :
					<span style={{ fontWeight: '400' }}>
						10
					</span>
				</div>
			</div>
		</div>
	);
}
export default Footer;
