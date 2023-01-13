import useGetContractPortPairProjectedStats from "../../../../../hooks/useGetContractPortPairProjectedStats";
import ProfitabilityPrediction from "./ProfitabilityPrediction";
import RevenuePrediction from "./RevenuePrediction";
import ServiceProvier from "./ServiceProvider";
import styles from "./styles.module.css";

function Charts({ activePair, handleUpdateContract, status, statsData, data }) {
  const { data: statsDataRevenue } = useGetContractPortPairProjectedStats({
    payload: {
      id: data?.id,
      contract_service_id: activePair?.id,
      service_type: activePair?.service_type,
      origin_port_id: activePair?.origin_port_id,
      destination_port_id: activePair?.destination_port_id,
    },
  });

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.heading}>Service Provider</div>
        <ServiceProvier
          activePair={activePair}
          handleUpdateContract={handleUpdateContract}
          status={status}
          statsData={statsData}
        />
        <div className={styles.stats} />
      </div>
      <div>
        <div className={styles.heading}>Profitability Prediction</div>
        <ProfitabilityPrediction
          activePair={activePair}
          statsDataRevenue={statsDataRevenue}
        />
      </div>
      {/* <div>
        <div className={styles.heading}>
          Revenue Prediction from Previous Contracts
        </div>
        <RevenuePrediction />
      </div> */}
      {/* <div>
				<div className={styles.heading}>
					Demand Visibility for Shanghai - Mumbai
				</div>
				<DemandVisibility />
			</div> */}
    </div>
  );
}

export default Charts;
