import Line from "../../../../../common/Line";
import Margin from "../../../../../common/MiniCard/Margin";
import Percentage from "../../../../../common/MiniCard/Percentage";
import Price from "../../../../../common/MiniCard/Price";
import useFclFreightRateForecasting from "../../../../../hooks/useFclFreightRateForecasting";

import Frequency from "./Frequency";
import styles from "./styles.module.css";

function ProfitabilityPrediction({ activePair, statsDataRevenue }) {
  const { data } = useFclFreightRateForecasting({ data: activePair });
  let avgPrice = 0;
  if ((data || []).length) {
    (data || []).forEach((rate) => {
      avgPrice = avgPrice + rate;
    });
    avgPrice = avgPrice / 30;
  }

  return (
    <div className={styles.chart}>
      <div className={styles.head_profit}>
        <Margin
          heading="Avg. Buy Price in the last 30 Days"
          value={statsDataRevenue?.avg_buy_price_in_last_30_days}
        />
        <Line />
        <Margin
          heading="Avg. Sell Price in the last 30 Days"
          value={statsDataRevenue?.avg_buy_price_in_last_30_days}
        />
        <Line />
        <Margin heading="Avg. Buy Price in the next 30 Days" value={Math.round(avgPrice)} />
      </div>
      <div className={styles.stats}>
        <div className={styles.graph_heading}>
          Predicted Avg. Price Data for the next 30 Days
        </div>
        <Frequency data={data} avgPrice={avgPrice} />
      </div>
    </div>
  );
}

export default ProfitabilityPrediction;
