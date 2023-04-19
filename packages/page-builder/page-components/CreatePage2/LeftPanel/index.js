import { TabPanel, Tabs } from '@cogoport/components';

import Content from './Content';
import Settings from './Settings';
import Structure from './Structure';

function LeftPanel(props) {
	const {
		activeTab,
		setActiveTab,
		component,
		setComponent,
		selectedRow,
		onNewItemAdding,
		addNewItem,
		showContentModal,
		setShowContentModal,
		parentComponentId,
		setParentComponentId,
		selectedItem,
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
					addNewItem={addNewItem}
					onNewItemAdding={onNewItemAdding}
					selectedRow={selectedRow}
					parentComponentId={parentComponentId}
					setParentComponentId={setParentComponentId}
					setShowContentModal={setShowContentModal}
					componentType="parent"
					component={component}
					setComponent={setComponent}
					selectedItem={selectedItem}
				/>
			</TabPanel>

			<TabPanel name="structure" title="Structure">
				<Structure
					selectedRow={selectedRow}
					setShowContentModal={setShowContentModal}
					setParentComponentId={setParentComponentId}
					addNewItem={addNewItem}
					onNewItemAdding={onNewItemAdding}
				/>
			</TabPanel>

			<TabPanel name="settings" title="Settings">
				<Settings
					component={component}
					selectedRow={selectedRow}
					selectedItem={selectedItem}
					setComponent={setComponent}
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
