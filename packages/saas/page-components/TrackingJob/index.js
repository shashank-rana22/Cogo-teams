import { Tabs, TabPanel } from '@cogoport/components';
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
	return (

		<div className={styles.main_container}>

			<h1>Tracking Job</h1>

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
