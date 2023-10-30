import { Tabs, TabPanel, Toggle } from '@cogoport/components';
import { useHandleVersionChangeToOld, dynamic } from '@cogoport/next';
import { useState } from 'react';

import styles from './styles.module.css';

const TAB_MAPPING = [
	{
		name      : 'air_tracking',
		title     : 'Air Tracking',
		Component : dynamic(() => import('./components/Tracking/AirTracking'), { ssr: false }),
	},
	{
		name      : 'ocean_tracking',
		title     : 'Ocean Tracking',
		Component : dynamic(() => import('./components/Tracking/OceanTracking'), { ssr: false }),
	},
	{
		name      : 'truck_tracking',
		title     : 'Surface Tracking',
		Component : dynamic(() => import('./components/Tracking/TruckTracking'), { ssr: false }),
	},
];

function TrackingJob() {
	const [activeTab, setActiveTab] = useState('air_tracking');

	const { handleRouteChange } = useHandleVersionChangeToOld({});

	return (
		<div>
			<div className={styles.header}>
				<h1>Tracking Job</h1>
				<Toggle
					size="md"
					onLabel="Old"
					offLabel="New"
					onChange={handleRouteChange}
				/>

			</div>

			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				{TAB_MAPPING.map((tab) => {
					const { name, title, Component } = tab;
					return (
						<TabPanel name={name} title={title} key={name}>
							<Component />
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}
export default TrackingJob;
