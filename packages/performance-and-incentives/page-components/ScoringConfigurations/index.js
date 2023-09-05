import { TabPanel, Tabs } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import Agents from './components/Agents';
import Configurations from './components/Configurations';
import TAB_PANNEL_KEYS from './constants/tab-pannel-keys-mapping';
import styles from './styles.module.css';

const { CONFIGURATIONS, AGENTS } = TAB_PANNEL_KEYS;

const TAB_PANNEL_COMPONENT_MAPPING = {
	[CONFIGURATIONS]: {
		name      : CONFIGURATIONS,
		title     : startCase(CONFIGURATIONS),
		Component : Configurations,
	},
	[AGENTS]: {
		name      : AGENTS,
		title     : startCase(AGENTS),
		Component : Agents,
	},
};

function ScoringConfigurations() {
	const [activeTab, setActiveTab] = useState(CONFIGURATIONS);

	return (
		<section className={styles.container}>
			<h2>Scoring Configurations</h2>

			<section className={styles.tabs}>
				<Tabs
					activeTab={activeTab}
					onChange={setActiveTab}
					fullWidth
					themeType="primary"
				>
					{Object.values(TAB_PANNEL_COMPONENT_MAPPING).map((item) => {
						const { name, title, Component } = item;

						if (!Component) return null;

						return (
							<TabPanel key={name} name={name} title={title}>
								<Component key={name} />
							</TabPanel>
						);
					})}
				</Tabs>
			</section>
		</section>
	);
}

export default ScoringConfigurations;
