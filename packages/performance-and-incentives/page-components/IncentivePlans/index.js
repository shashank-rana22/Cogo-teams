import { TabPanel, Tabs } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import Agents from './components/Agents';
import Plans from './components/Plans';
import TAB_PANNEL_KEYS from './constants/tab-pannel-keys-mapping';
import styles from './styles.module.css';

const { INCENTIVE_PLANS, AGENTS } = TAB_PANNEL_KEYS;

const TAB_PANNEL_COMPONENT_MAPPING = {
	[INCENTIVE_PLANS]: {
		name      : INCENTIVE_PLANS,
		title     : startCase(INCENTIVE_PLANS),
		Component : Plans,
	},
	[AGENTS]: {
		name      : AGENTS,
		title     : startCase(AGENTS),
		Component : Agents,
	},
};

function IncentivePlans() {
	const [activeTab, setActiveTab] = useState(INCENTIVE_PLANS);

	return (
		<section className={styles.container}>
			<h2>Incentive</h2>

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

export default IncentivePlans;
