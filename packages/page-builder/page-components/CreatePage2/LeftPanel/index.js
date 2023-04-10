import { TabPanel, Tabs } from '@cogoport/components';

import Content from './Content';
import Settings from './Settings';
import Structure from './Structure';

function LeftPanel(props) {
	const {
		activeTab,
		setActiveTab,
		components,
		setComponents,
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
					parentComponentId={parentComponentId}
					setParentComponentId={setParentComponentId}
					setShowContentModal={setShowContentModal}
				/>
			</TabPanel>

			<TabPanel name="structure" title="structure">
				<Structure
					components={components}
					setComponents={setComponents}
					showContentModal={showContentModal}
					setShowContentModal={setShowContentModal}
					parentComponentId={parentComponentId}
					setParentComponentId={setParentComponentId}
				/>
			</TabPanel>

			<TabPanel name="settings" title="Settings">
				<Settings />
			</TabPanel>

		</Tabs>
	);
}

export default LeftPanel;
