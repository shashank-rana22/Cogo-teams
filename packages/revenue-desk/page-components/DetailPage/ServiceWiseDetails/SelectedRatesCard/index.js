import Card from '../RatesCard/Card';

import styles from './styles.module.css';

function SelectedRatesCard({ prefrences }) {
	return (
		<div className={styles.container}>
			<div className={styles.upper_section}>
				<div className={styles.heading}>
					Selected Rates
				</div>
				<div className={styles.text_container}>
					<div className={styles.text}>
						Consolidated Buy Price  :
						<span className={styles.key}>USD 910</span>
					</div>
					<div className={styles.text}>
						Consolidated Profitability :
						<span className={styles.key}>1.1 %</span>
					</div>
				</div>
			</div>
			<div className={styles.lower_section}>
				{prefrences?.map((Singleitem) => (
					<div key={Singleitem}>
						<Card data={Singleitem?.data} rate_key={Singleitem?.key} />
					</div>
				))}
			</div>

		</div>
	);
}

export default SelectedRatesCard;
