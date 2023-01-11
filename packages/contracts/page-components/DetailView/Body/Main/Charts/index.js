import DemandVisibility from './DemandVisibility';
import ProfitabilityPrediction from './ProfitabilityPrediction';
import RevenuePrediction from './RevenuePrediction';
import ServiceProvier from './ServiceProvider';
import styles from './styles.module.css';

function Charts() {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.heading}>
					Service Provider
				</div>
				<ServiceProvier />
				<div className={styles.stats} />
			</div>
			<div>
				<div className={styles.heading}>
					Profitability Prediction
				</div>
				<ProfitabilityPrediction />
				<div className={styles.stats} />
			</div>
			<div>
				<div className={styles.heading}>
					Revenue Prediction from Previous Contracts
				</div>
				<RevenuePrediction />
			</div>
			<div>
				<div className={styles.heading}>
					Demand Visibility for Shanghai - Mumbai
				</div>
				<DemandVisibility />
			</div>

		</div>
	);
}

export default Charts;
