import { Tabs, TabPanel, cl, Placeholder } from '@cogoport/components';
import { Image } from '@cogoport/next';
import { useState } from 'react';

import { NETWORK_EMPTY_STATE } from '../../constants';
import useGetSimulation from '../../hooks/useGetSimulation';

import MyResponsiveScatterPlot from './DiameterGraph';
import LevelPayouts from './LevelPayouts';
import styles from './styles.module.css';

const emptyState = false;

function ReturnComponent({
	activeTab = '',
	type = '', singleData = {}, setSingleData = () => {}, simulationData = {}, loading,
}) {
	const renderCom = {
		level   : <LevelPayouts singleData={singleData} activeTab={activeTab} />,
		revenue : <MyResponsiveScatterPlot
			singleData={singleData}
			setSingleData={setSingleData}
			simulationData={simulationData}
			activeTab={activeTab}
		/>,

	};
	if (loading) {
		return (
			<div>
				<div className={styles.networks_chart}>
					{[...Array(type === 'level' ? 14 : 15)].map((itm) => (
						<Placeholder
							className={styles.networks_skeleton}
							key={itm}
						/>
					))}
				</div>
			</div>
		);
	}
	if (emptyState) {
		return (
			<div className={cl`${styles.empty_state} ${type === 'level' && styles.level_empty_state}`}>
				<Image
					src={NETWORK_EMPTY_STATE}
					alt="empty-state"
					width={150}
					height={150}
				/>
			</div>
		);
	}
	return renderCom[type];
}

function SimulationGraphs({ activeTab = '', simulationData = {}, singleData = {}, setSingleData = () => {}, loading }) {
	return (
		<div className={styles.conatiner}>
			<div className={styles.revenue_graph}>
				<div className={styles.diameter_header}>Revenue by Level to Payout chart</div>
				<ReturnComponent
					loading={loading}
					type="revenue"
					setSingleData={setSingleData}
					singleData={singleData}
					simulationData={simulationData}
					activeTab={activeTab}
				/>
			</div>
			<div className={styles.level_graph}>
				<div className={styles.levels_header}>
					{['Levels', 'Payout (INR)'].map((itm) => (
						<div key={itm}>
							<div className={styles.level_name}>{itm}</div>
						</div>
					))}
				</div>
				<ReturnComponent
					loading={loading}
					type="level"
					setSingleData={setSingleData}
					singleData={singleData}
					simulationData={simulationData}
					activeTab={activeTab}
				/>
			</div>
		</div>
	);
}

function Simulation() {
	const [activeTab, setActiveTab] = useState('shipment');
	const [singleData, setSingleData] = useState({});

	const { data = {}, loading } = useGetSimulation({ activeTab, setSingleData, type: 'simulation_data' });
	const simulationData = data?.data;

	return (
		<Tabs
			activeTab={activeTab}
			themeType="primary"
			onChange={setActiveTab}
		>
			<TabPanel
				name="shipment"
				title="Shipment"
			>

				<SimulationGraphs
					loading={loading}
					singleData={singleData}
					setSingleData={setSingleData}
					simulationData={simulationData}
					activeTab={activeTab}
				/>
			</TabPanel>

			<TabPanel
				name="subscription"
				title="Subscription"
			>
				<SimulationGraphs
					loading={loading}
					singleData={singleData}
					setSingleData={setSingleData}
					simulationData={simulationData}
					activeTab={activeTab}
				/>
			</TabPanel>
		</Tabs>

	);
}

export default Simulation;
