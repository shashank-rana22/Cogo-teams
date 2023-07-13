import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import styles from './styles.module.css';
import VesselSchedulesList from './VesselSchedulesList';

function VesselSchedule() {
	const ACTIVE_TAB = 'vessel_schedules';
	const [showModal, setShowModal] = useState(false);
	const partnerId = useSelector((state) => state?.profile?.partner?.id);
	const handleTabChange = (tab) => {
		if (tab !== 'vessel_schedules') {
			const route = tab.replace(/_/g, '-');
			// eslint-disable-next-line no-undef
			window.location.href = `/v2/${partnerId}/schedules/${route}`;
		}
	};

	return (
		<>
			<div className={styles.tilte}>Sailing Schedules Manangement</div>
			<Tabs activeTab={ACTIVE_TAB} themeType="secondary" onChange={(val) => { handleTabChange(val); }}>
				<TabPanel name="ocean_schedule_coverage" title="Ocean Schedule Coverage">
					<div>Ocean Schedule Coverage</div>
				</TabPanel>
				<TabPanel name="sailing_schedules" title="Sailing Schedules">
					<div>Sailing Schedules</div>
				</TabPanel>

				<TabPanel name="vessel_schedules" title="Vessel Schedules">
					<div className={styles.tabPanelWrapper}>
						<Button size="lg" themeType="primary" onClick={() => { setShowModal(true); }}>
							+ Create
						</Button>
					</div>
					<VesselSchedulesList showModal={showModal} setShowModal={setShowModal} />
				</TabPanel>

				<TabPanel name="service_lanes" title="Service Lanes">
					<div>Service Lanes</div>
				</TabPanel>
			</Tabs>
		</>
	);
}
export default VesselSchedule;
