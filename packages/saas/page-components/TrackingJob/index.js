import { Tabs, TabPanel, Toggle } from '@cogoport/components';
import { useHandleVersionChangeToOld } from '@cogoport/next';
import { useState } from 'react';

import AirTracking from './pages-component/Tracking/AirTracking';
import OceanTracking from './pages-component/Tracking/OceanTracking';
import TruckTracking from './pages-component/Tracking/TruckTracking';
import styles from './styles.module.css';

function TrackingJob() {
	const [activeTab, setActiveTab] = useState('air_tracking');

	const onTabChange = (name) => {
		setActiveTab(name);
	};
	const { handleRouteChange } = useHandleVersionChangeToOld({});
	return (

		<div className={styles.main_container}>
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
				onChange={onTabChange}
			>
				<TabPanel name="air_tracking" title="Air Tracking">
					<AirTracking />
				</TabPanel>
				<TabPanel name="ocean_tracking" title="Ocean Tracking">
					<OceanTracking />
				</TabPanel>
				<TabPanel name="truck_tracking" title="Surface Tracking">
					<TruckTracking />
				</TabPanel>
			</Tabs>
		</div>
	);
}
export default TrackingJob;
