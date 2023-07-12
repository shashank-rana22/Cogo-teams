import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useState } from 'react';

import SailingScheduleList from './SailingScheduleList';
import styles from './styles.module.css';

function SailingSchedules() {
	const [activeTab, setActiveTab] = useState('sailing_schedules');
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className={styles.tilte}>Sailing Schedules Manangement</div>
			<Tabs activeTab={activeTab} themeType="secondary" onChange={setActiveTab}>
				<TabPanel name="sailing_schedules" title="Sailing Schedules">
					<div className={styles.tabPanelWrapper}>
						<Button size="lg" themeType="primary" onClick={() => { setShowModal(true); }}>
							+ Create
						</Button>
					</div>
					<SailingScheduleList showModal={showModal} setShowModal={setShowModal} />
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
