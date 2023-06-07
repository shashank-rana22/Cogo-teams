import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import useGetSimulation from '../../hooks/useGetSimulation';

import SimulationGraphs from './SimulationGraphs';

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
