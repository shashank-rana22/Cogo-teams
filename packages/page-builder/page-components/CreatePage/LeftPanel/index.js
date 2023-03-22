import { TabPanel, Tabs } from '@cogoport/components';

import Content from './Content';

function LeftPanel(props) {
	const { activeTab, setActiveTab } = props;

	return (
		<Tabs
			fullWidth
			activeTab={activeTab}
			themeType="primary"
			onChange={setActiveTab}
		>

			<TabPanel name="content" title="Content">
				<Content />
			</TabPanel>

			<TabPanel name="settings" title="Settings">
				<div>Settings</div>
			</TabPanel>
		</Tabs>
	);
}

export default LeftPanel;
