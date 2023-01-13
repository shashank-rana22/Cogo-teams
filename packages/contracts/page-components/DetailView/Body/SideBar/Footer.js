import styles from "./styles.module.css";

function Footer({ statsData, portPair }) {
  //   const keys = ["id"],
  //     filteredData = (statsData?.port_pair_stats || []).filter(
  //       (
  //         (s) => (o) =>
  //           ((k) => !s.has(k) && s.add(k))(keys.map((k) => o[k]).join("|"))
  //       )(new Set())
  //     );

  const stats = (statsData?.port_pairs_data || []).map((item) => {
    if (item.id === portPair?.id) {
      return statsData?.port_pairs_data;
    }
  })[0];

  return (
    <div className={styles.footer}>
      <div>
        <div className={styles.label}>Overseas Agent</div>
        <div className={styles.value}>
          {stats?.[0]?.overseas_agent?.short_name
            ? stats?.[0]?.overseas_agent?.short_name
            : "-"}
        </div>
      </div>
      <div>
        <div className={styles.label}>Fulfilment</div>
        <div className={styles.value}>{stats?.[0]?.fulfilment}%</div>
      </div>
      <div>
        <div className={styles.label}>Rate</div>
        <div className={styles.value}>
          {stats?.[0]?.price ? stats?.[0]?.price : "-"}
        </div>
      </div>
      <div>
        <div className={styles.label}>Profitability</div>
        <div className={styles.value}>
          {stats?.[0]?.profitability ? stats?.[0]?.profitability : "-"}
        </div>
      </div>
    </div>
  );
}
export default Footer;
