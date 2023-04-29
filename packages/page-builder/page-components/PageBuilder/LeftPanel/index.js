import { TabPanel, Tabs } from '@cogoport/components';

import Content from './Content';
import Settings from './Settings';
import Structure from './Structure';

function LeftPanel(props) {
	const {
		activeTab,
		setActiveTab,
		selectedRow,
		onNewItemAdding,
		addNewItem,
		showContentModal,
		setShowContentModal,
		parentComponentId,
		setParentComponentId,
		selectedItem,
		setSelectedItem,
		pageConfiguration,
		setPageConfiguration,
		selectedColumn,
		selectedNestedColumn,
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
					dropSource="sidebar"
					pageConfiguration={pageConfiguration}
					setPageConfiguration={setPageConfiguration}
					selectedItem={selectedItem}
					selectedColumn={selectedColumn}
					selectedNestedColumn={selectedNestedColumn}
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
					selectedRow={selectedRow}
					selectedItem={selectedItem}
					pageConfiguration={pageConfiguration}
					setPageConfiguration={setPageConfiguration}
					showContentModal={showContentModal}
					setShowContentModal={setShowContentModal}
					parentComponentId={parentComponentId}
					setParentComponentId={setParentComponentId}
					addNewItem={addNewItem}
					onNewItemAdding={onNewItemAdding}
					setSelectedItem={setSelectedItem}
				/>
			</TabPanel>
		</Tabs>
	);
}

export default LeftPanel;
