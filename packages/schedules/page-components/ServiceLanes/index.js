import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import ServiceLanesList from './ServiceLanesList';
import styles from './styles.module.css';

function ServiceLane() {
	const ACTIVE_TAB = 'service_lanes';
	const partnerId = useSelector((state) => state?.profile?.partner?.id);
	const [showModal, setShowModal] = useState(false);
	const handleTabChange = (tab) => {
		if (tab !== 'service_lanes') {
			const route = tab.replace(/_/g, '-');
			// eslint-disable-next-line no-undef
			window.location.href = `/v2/${partnerId}/schedules/${route}`;
		}
	};
	return (
		<div className={styles.outer_box}>
			<Tabs
				activeTab={ACTIVE_TAB}
				themeType="secondary"
				onChange={(tab) => { handleTabChange(tab); }}
			>
				<TabPanel name="ocean_schedule_coverage" title="Ocean Schedule Coverage">
					<div>Ocean Schedule Coverage</div>
				</TabPanel>
				<TabPanel name="sailing_schedules" title="Sailing Schedules">
					<div>Sailing Schedules</div>
				</TabPanel>

				<TabPanel name="vessel_schedules" title="Vessel Schedules">
					<div>Vessel Schedule</div>
				</TabPanel>

				<TabPanel name="service_lanes" title="Service Lanes">

					<div className={styles.tabPanelWrapper}>
						<Button size="lg" themeType="primary" onClick={() => { setShowModal(true); }}>
							+ Create
						</Button>
					</div>
					<ServiceLanesList
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default ServiceLane;
