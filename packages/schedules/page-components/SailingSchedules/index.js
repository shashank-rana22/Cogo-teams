import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import SailingScheduleList from './SailingScheduleList';
import styles from './styles.module.css';

function SailingSchedules() {
	const ACTIVE_TAB = 'sailing_schedules';
	const partnerId = useSelector((state) => state?.profile?.partner?.id);
	const [showModal, setShowModal] = useState(false);
	const handleTabChange = (tab) => {
		if (tab !== 'sailing_schedules') {
			const route = tab.replace(/_/g, '-');
			// eslint-disable-next-line no-undef
			window.location.href = `/v2/${partnerId}/schedules/${route}`;
		}
	};

	return (
		<>
			<div className={styles.tilte}>Sailing Schedules Manangement</div>
			<Tabs activeTab={ACTIVE_TAB} themeType="secondary" onChange={(tab) => { handleTabChange(tab); }}>
				<TabPanel name="ocean_schedule_coverage" title="Ocean Schedule Coverage">
					<div>Ocean Schedule Coverage</div>
				</TabPanel>
				<TabPanel name="sailing_schedules" title="Sailing Schedules">
					<div className={styles.tabPanelWrapper}>
						<Button size="lg" themeType="primary" onClick={() => { setShowModal(true); }}>
							+ Create
						</Button>
					</div>
					<SailingScheduleList showModal={showModal} setShowModal={setShowModal} />
				</TabPanel>

				<TabPanel name="vessel_schedules" title="Vessel Schedules">
					<div>Vessel Schedules</div>
				</TabPanel>

				<TabPanel name="service_lanes" title="Service Lanes">
					<div>Service Lanes</div>
				</TabPanel>
			</Tabs>
		</>
	);
}
export default SailingSchedules;
