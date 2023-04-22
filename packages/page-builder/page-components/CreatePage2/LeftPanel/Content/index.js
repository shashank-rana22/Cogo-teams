import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import Basic from './Basic';
import styles from './styles.module.css';

function Content(props) {
	const {
		addNewItem,
		onNewItemAdding,
		selectedRow,
		componentType,
		parentComponentId,
		component,
		setComponent,
		selectedItem,
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
						componentType={componentType}
						component={component}
						setComponent={setComponent}
						selectedItem={selectedItem}
					/>
				</TabPanel>

				<TabPanel name="premade" title="Premade">
					Premade
				</TabPanel>
			</Tabs>

		</div>
	);
}
export default Content;
