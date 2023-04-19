import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Body from './Body';
import CogoAssist from './CogoAssist';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	questions: {
		Component : Body,
		title     : 'Questions',
	},
	cogo_assist: {
		Component : CogoAssist,
		title     : 'Cogo Assist',
	},
};

function RightSection({
	setShowSubmitTestModal,
	setShowInstructionsModal,
	setActiveState,
}) {
	const [activeTab, setActiveTab] = useState('questions');

	return (
		<div className={styles.container}>
			<Header setShowInstructionsModal={setShowInstructionsModal} />

			<div className={styles.toggle_container}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="secondary"
					onChange={setActiveTab}
				>
					{Object.keys(COMPONENT_MAPPING).map((key) => {
						const { Component: ActiveComponent, title } = COMPONENT_MAPPING[key];

						return (
							<TabPanel key={key} name={key} title={title}>
								<div className={styles.component_container}>
									<ActiveComponent />
								</div>
							</TabPanel>
						);
					})}
				</Tabs>
			</div>

			<Footer setActiveState={setActiveState} setShowSubmitTestModal={setShowSubmitTestModal} />
		</div>
	);
}

export default RightSection;
