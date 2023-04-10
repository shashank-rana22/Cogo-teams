import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import Basic from './Basic';
import styles from './styles.module.css';

function Content(props) {
	const {
		components,
		setComponents,
		parentComponentId,
		setParentComponentId,
		setShowContentModal,
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
						components={components}
						setComponents={setComponents}
						parentComponentId={parentComponentId}
						setParentComponentId={setParentComponentId}
						setShowContentModal={setShowContentModal}

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
