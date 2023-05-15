import NetworkLineChart from '../../../../configurations/network-line-chart';

import styles from './styles.module.css';

function Networks({ networkData = {} }) {
	return (
		<>
			<div className={styles.title}>NETWORKS</div>
			<div className={styles.line_chart}>
				<NetworkLineChart networkData={networkData} />
			</div>
		</>
	);
}

export default Networks;
