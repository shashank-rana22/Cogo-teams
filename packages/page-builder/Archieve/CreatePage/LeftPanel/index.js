import { TabPanel, Tabs } from '@cogoport/components';

import Content from './Content';

function LeftPanel(props) {
	const { activeTab, setActiveTab, components, setComponents, selectedRow, onNewItemAdding, addNewItem } = props;

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
					selectedRow={selectedRow}

				/>
			</TabPanel>

			<TabPanel name="settings" title="Settings">
				<div>Settings</div>
			</TabPanel>
		</Tabs>
	);
}

export default LeftPanel;
