import Card from '../RatesCard/Card';

import styles from './styles.module.css';

function SelectedRatesCard({
	prefrences, price, shipmentType, setSellRates,
	sellRates,
}) {
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
				{prefrences?.map((singleItem) => (
					<div key={singleItem}>
						<Card
							data={singleItem?.data}
							rate_key
							fromkey={singleItem?.key}
							price={price}
							shipmentType={shipmentType}
							setSellRates={setSellRates}
							sellRates={sellRates}
						/>
					</div>
				))}
			</div>

		</div>
	);
}

export default SelectedRatesCard;
