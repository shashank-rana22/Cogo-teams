import { TabPanel, Tabs } from '@cogoport/components';

import Content from './Content';
import Settings from './Settings';
import Structure from './Structure';

function LeftPanel(props) {
	const {
		activeTab, setActiveTab, components,
		setComponents,
		selectedItem,
		onNewItemAdding,
		addNewItem,
		showContentModal,
		setShowContentModal,
		parentComponentId,
		setParentComponentId,
	} = props;

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
					parentComponentId={parentComponentId}
					setParentComponentId={setParentComponentId}
					setShowContentModal={setShowContentModal}
					componentType="parent"
				/>
			</TabPanel>

			<TabPanel name="structure" title="structure">
				<Structure
					components={components}
					selectedItem={selectedItem}
					setComponents={setComponents}
					showContentModal={showContentModal}
					setShowContentModal={setShowContentModal}
					parentComponentId={parentComponentId}
					setParentComponentId={setParentComponentId}
					addNewItem={addNewItem}
					onNewItemAdding={onNewItemAdding}

				/>
			</TabPanel>

			<TabPanel name="settings" title="Settings">
				<Settings
					components={components}
					selectedItem={selectedItem}
					setComponents={setComponents}
					showContentModal={showContentModal}
					setShowContentModal={setShowContentModal}
					parentComponentId={parentComponentId}
					setParentComponentId={setParentComponentId}
					addNewItem={addNewItem}
					onNewItemAdding={onNewItemAdding}
				/>
			</TabPanel>
		</Tabs>
	);
}

export default LeftPanel;
