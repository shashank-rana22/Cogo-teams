import { TabPanel, Tabs } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Agents from './components/Agents';
import Objectives from './components/Objectives';
import TAB_PANNEL_KEYS from './constants/tab-pannel-keys-mapping';
import styles from './styles.module.css';

const { OBJECTIVES, AGENTS } = TAB_PANNEL_KEYS;

const getTabPanelMappings = ({ t = () => {} }) => ({
	[OBJECTIVES]: {
		name      : OBJECTIVES,
		title     : t('allocation:tab_objectives_label'),
		Component : Objectives,
	},
	[AGENTS]: {
		name      : AGENTS,
		title     : t('allocation:tab_agent_label'),
		Component : Agents,
	},
});

function ObjectiveConfigurations() {
	const { t } = useTranslation(['allocation']);

	const [activeTab, setActiveTab] = useState(OBJECTIVES);

	const tabPanelMappings = getTabPanelMappings({ t });

	return (
		<section className={styles.container}>
			<div className={styles.heading_container}>
				{t('allocation:objective_configuration_heading')}
			</div>

			<section className={styles.tabs}>
				<Tabs
					activeTab={activeTab}
					onChange={setActiveTab}
					fullWidth
					themeType="secondary"
				>
					{Object.values(tabPanelMappings).map((item) => {
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

export default ObjectiveConfigurations;
