import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import Agents from './components/Agents';
import Objectives from './components/Objectives';
import TAB_PANNEL_KEYS from './constants/tab-pannel-keys-mapping';
import styles from './styles.module.css';

const { OBJECTIVES, AGENTS } = TAB_PANNEL_KEYS;

const TAB_PANEL_MAPPING = {
	[OBJECTIVES]: {
		name      : OBJECTIVES,
		title     : 'Objectives',
		Component : Objectives,
	},
	[AGENTS]: {
		name      : AGENTS,
		title     : 'Agents',
		Component : Agents,
	},
};

function ObjectiveConfigurations() {
	const [activeTabDetails, setActiveTabDetails] = useState({ tab: OBJECTIVES, mode: 'list' });

	return (
		<section className={styles.container}>
			<div className={styles.heading_container}>
				Objective Configurations
			</div>

			<section className={styles.tabs}>
				<Tabs
					activeTab={activeTabDetails.tab}
					onChange={(tab) => setActiveTabDetails((pv) => ({
						...pv,
						tab,
					}))}
					fullWidth
					themeType="secondary"
				>
					{Object.values(TAB_PANEL_MAPPING).map((item) => {
						const { name, title, Component } = item;

						if (!Component) return null;

						return (
							<TabPanel key={name} name={name} title={title}>
								<Component
									activeTabDetails={activeTabDetails}
									setActiveTabDetails={setActiveTabDetails}
								/>
							</TabPanel>
						);
					})}
				</Tabs>
			</section>
		</section>

	);
}

export default ObjectiveConfigurations;
