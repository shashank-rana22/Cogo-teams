import { Tabs, TabPanel } from '@cogoport/components';

import styles from './styles.module.css';

function SideTabs({ activeTab, setActiveTab = () => {} }) {
	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				themeType="primary-vertical"
				onChange={setActiveTab}
			>
				<TabPanel name="open" title="Open" />

				<TabPanel name="reassigned" title="Reassigned" />

				<TabPanel name="closed" title="Closed" />
			</Tabs>
		</div>
	);
}

export default SideTabs;
