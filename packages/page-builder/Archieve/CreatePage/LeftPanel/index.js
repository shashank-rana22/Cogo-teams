import { TabPanel, Tabs } from '@cogoport/components';

import Content from './Content';

function LeftPanel(props) {
	const { activeTab, setActiveTab, components, setComponents, selectedItem, onNewItemAdding, addNewItem } = props;

	return (
		<Tabs
			fullWidth
			activeTab={activeTab}
			themeType="primary"
			onChange={setActiveTab}
		>

			<TabPanel name="content" title="Content">
				<Content
					components={components}
					setComponents={setComponents}
					addNewItem={addNewItem}
					onNewItemAdding={onNewItemAdding}
					selectedItem={selectedItem}

				/>
			</TabPanel>

			<TabPanel name="settings" title="Settings">
				<div>Settings</div>
			</TabPanel>
		</Tabs>
	);
}

export default LeftPanel;
