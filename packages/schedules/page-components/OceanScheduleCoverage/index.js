import { TabPanel, Tabs } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import Content from './content';
import styles from './styles.module.css';

function OceanScheduleCoverage() {
	const ACTIVE_TAB = 'ocean_schedule_coverage';
	const partnerId = useSelector((state) => state?.profile?.partner?.id);

	const handleTabChange = (tab) => {
		if (tab !== 'ocean_schedule_coverage') {
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
					<Content />
				</TabPanel>
				<TabPanel name="sailing_schedules" title="Sailing Schedules">
					<div>Sailing Schedules</div>
				</TabPanel>

				<TabPanel name="vessel_schedules" title="Vessel Schedules">
					<div>Vessel Schedule</div>
				</TabPanel>

				<TabPanel name="service_lanes" title="Service Lanes">
					<div>Service Lanes</div>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default OceanScheduleCoverage;
