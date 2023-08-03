import { TabPanel, Tabs } from '@cogoport/components';

import Content from './Content';
import Settings from './Settings';
import Structure from './Structure';
import styles from './styles.module.css';

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
		setSelectedRow,
		setSelectedColumn,
		setSelectedNestedColumn,
		modeType,
		previewMode,
	} = props;

	if (modeType !== 'edit') {
		return null;
	}

	return (
		<div className={styles.left_panel}>
			<Tabs
				className={styles.ui_tabs_container}
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

				<TabPanel name="structure" title="Layouts">
					<Structure
						selectedRow={selectedRow}
						setShowContentModal={setShowContentModal}
						setParentComponentId={setParentComponentId}
						addNewItem={addNewItem}
						onNewItemAdding={onNewItemAdding}
						previewMode={previewMode}
					/>
				</TabPanel>

				<TabPanel name="settings" title="Settings">
					<Settings
						selectedRow={selectedRow}
						selectedItem={selectedItem}
						selectedColumn={selectedColumn}
						selectedNestedColumn={selectedNestedColumn}
						pageConfiguration={pageConfiguration}
						setPageConfiguration={setPageConfiguration}
						showContentModal={showContentModal}
						setShowContentModal={setShowContentModal}
						parentComponentId={parentComponentId}
						setSelectedItem={setSelectedItem}
						setSelectedRow={setSelectedRow}
						setSelectedColumn={setSelectedColumn}
						setSelectedNestedColumn={setSelectedNestedColumn}
						setParentComponentId={setParentComponentId}
						addNewItem={addNewItem}
						onNewItemAdding={onNewItemAdding}
					/>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default LeftPanel;
