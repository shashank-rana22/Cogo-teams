import NetworkLineChart from '../../../../configurations/network-line-chart';

import styles from './styles.module.css';

function Networks() {
	return (
		<>
			<div className={styles.title}>NETWORKS</div>
			<div className={styles.line_chart}>
				<NetworkLineChart />
			</div>
		</>
	);
}

export default Networks;
