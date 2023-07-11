import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import SailingScheduleList from './SailingScheduleList';
import styles from './styles.module.css';

function SailingSchedules() {
	const [activeTab, setActiveTab] = useState('sailing_schedules');
	return (
		<>
			<div className={styles.tilte}>Sailing Schedules Manangement</div>
			<Tabs activeTab={activeTab} themeType="secondary" onChange={setActiveTab}>
				<TabPanel name="sailing_schedules" title="Sailing Schedules">
					<SailingScheduleList />
				</TabPanel>

				<TabPanel name="vessel_schedules" title="Vessel Schedules">
					<div>Sailing Schedules</div>
				</TabPanel>

				<TabPanel name="service_lanes" title="Service Lanes">
					<div>Service Lanes</div>
				</TabPanel>
			</Tabs>
		</>
	);
}
export default SailingSchedules;
