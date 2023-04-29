import ProfitabilityPrediction from './ProfitabilityPrediction';
import RevenuePrediction from './RevenuePrediction';
// import RevenuePrediction from './RevenuePrediction';
import ServiceProvier from './ServiceProvider';
import styles from './styles.module.css';

function Charts({ activePair, handleUpdateContract, data, statsData, stats }) {
	return (
		<div className={styles.container}>
			{
				data.source !== 'manual' && (
					<>
						<div>
							<div className={styles.heading}>Service Provider</div>
							<ServiceProvier
								activePair={activePair}
								handleUpdateContract={handleUpdateContract}
								statsData={statsData}
								stats={stats}
								data={data}
							/>
							<div className={styles.stats} />
						</div>
						<div>
							<div className={styles.heading}>Profitability Prediction</div>
							<ProfitabilityPrediction
								activePair={activePair}
							/>
						</div>
					</>
				)
			}

			<div>
				<div className={styles.heading}>Revenue Prediction from Previous Contracts</div>
				<RevenuePrediction
					activePair={activePair}
					data={data}
					statsData={statsData}
				/>
			</div>
		</div>
	);
}

export default Charts;
