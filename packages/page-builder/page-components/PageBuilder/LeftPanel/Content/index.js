import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import Basic from './Basic';
import Premade from './Premade';
import styles from './styles.module.css';

function Content(props) {
	const {
		addNewItem,
		onNewItemAdding,
		selectedRow,
		dropSource,
		parentComponentId,
		pageConfiguration,
		setPageConfiguration,
		selectedItem,
		selectedColumn,
		selectedNestedColumn,
	} = props;
	const [secondaryTab, setSecondaryTab] = useState('basic');

	return (
		<div className={styles.container}>

			<Tabs
				fullWidth
				activeTab={secondaryTab}
				themeType="secondary"
				onChange={setSecondaryTab}
			>

				<TabPanel name="basic" title="Basic">
					<Basic
						addNewItem={addNewItem}
						onNewItemAdding={onNewItemAdding}
						selectedRow={selectedRow}
						parentComponentId={parentComponentId}
						dropSource={dropSource}
						pageConfiguration={pageConfiguration}
						setPageConfiguration={setPageConfiguration}
						selectedItem={selectedItem}
						selectedColumn={selectedColumn}
						selectedNestedColumn={selectedNestedColumn}
					/>
				</TabPanel>

				<TabPanel name="premade" title="Premade">
					<Premade
						addNewItem={addNewItem}
						onNewItemAdding={onNewItemAdding}
						selectedRow={selectedRow}
						parentComponentId={parentComponentId}
						dropSource={dropSource}
						pageConfiguration={pageConfiguration}
						setPageConfiguration={setPageConfiguration}
						selectedItem={selectedItem}
					/>
				</TabPanel>
			</Tabs>

		</div>
	);
}
export default Content;
