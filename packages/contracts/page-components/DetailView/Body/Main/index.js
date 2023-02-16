import Charts from './Charts';
import Header from './Header';
import styles from './styles.module.css';

function Main({ activePair, handleUpdateContract, data, statsData }) {
	const stats = (statsData?.port_pairs_data || []).find((item) => item?.id === activePair?.id);

	return (
		<div className={styles.container}>
			<Header
				activePair={activePair}
				statsData={statsData}
				handleUpdateContract={handleUpdateContract}
				data={data}
				stats={stats}
			/>
			<Charts
				activePair={activePair}
				data={data}
				handleUpdateContract={handleUpdateContract}
				statsData={statsData}
				stats={stats}
			/>
		</div>
	);
}

export default Main;
