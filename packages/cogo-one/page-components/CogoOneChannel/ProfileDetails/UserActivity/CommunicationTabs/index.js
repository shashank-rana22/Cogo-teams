import { Tabs, TabPanel } from '@cogoport/components';

import styles from './styles.module.css';

function CommunicationTabs({
	activeSubTab = '',
	setActiveSubTab = () => {},
}) {
	return (
		<div className={styles.communication_options}>
			<Tabs
				activeTab={activeSubTab}
				themeType="secondary"
				onChange={setActiveSubTab}
				fullWidth={false}
			>
				<TabPanel name="channels" title="Channels" />
				<TabPanel name="agent" title="Agents" />
				<TabPanel name="summary" title="Summary" />
			</Tabs>
		</div>
	);
}

export default CommunicationTabs;
