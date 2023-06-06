import { Tabs, TabPanel } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useState } from 'react';

import useGetSimulation from '../../hooks/useGetSimulation';

import ReturnComponent from './ReturnComponent';
import styles from './styles.module.css';

function SimulationGraphs({ activeTab = '', simulationData = {}, singleData = {}, setSingleData = () => {}, loading }) {
	const geo = getGeoConstants();
	const currencyCode = geo.country.currency.code;
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
					{['Levels', `Payout (${currencyCode})`].map((itm) => (
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
