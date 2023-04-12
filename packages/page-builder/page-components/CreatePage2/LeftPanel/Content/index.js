/* eslint-disable max-len */
import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import Basic from './Basic';
import styles from './styles.module.css';

function Content(props) {
	const {
		addNewItem,
		onNewItemAdding,
		selectedItem,
		componentType,
		parentComponentId,
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
						selectedItem={selectedItem}
						parentComponentId={parentComponentId}
						componentType={componentType}
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
