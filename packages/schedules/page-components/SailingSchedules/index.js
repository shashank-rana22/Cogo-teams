import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import SailingScheduleList from './SailingScheduleList';
import styles from './styles.module.css';

function SailingSchedules() {
	const router = useRouter();
	const ACTIVE_TAB = 'sailing_schedules';
	const [showModal, setShowModal] = useState(false);
	const handleTabChange = (tab) => {
		if (tab !== 'sailing_schedules') {
			const route = tab.replace(/_/g, '-');
			// eslint-disable-next-line no-undef
			router.push(`/schedules/${route}`);
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
						<div className={styles.button_container}>
							<Button size="lg" themeType="primary" onClick={() => { setShowModal(true); }}>
								+ Create
							</Button>
						</div>
					</div>
					<SailingScheduleList
						showModal={showModal}
						setShowModal={setShowModal}
					/>
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
