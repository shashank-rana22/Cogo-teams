import { Tabs, TabPanel, Select } from '@cogoport/components';

import styles from './styles.module.css';
import { serviceOptions } from './utils/service-options';
import { statusTabs } from './utils/status-tabs';

function StatusBar({ activeTab, setActiveTab, approvalStats, currentService, setCurrentService, role }) {
	return (
		<div className={styles.parent}>
			<div className={styles.select_service}>
				<Select
					value={currentService}
					onChange={setCurrentService}
					placeholder="Select Books"
					options={serviceOptions}
				/>
			</div>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={(e) => setActiveTab(e)}
				fullWidth
			>
				{
				statusTabs({ approvalStats, role }).map((object) => (
					<TabPanel
						key={object?.name}
						name={object.name}
						title={object.title}
						badge={object.badge}
					/>
				))
                }
			</Tabs>
		</div>
	);
}
export default StatusBar;
