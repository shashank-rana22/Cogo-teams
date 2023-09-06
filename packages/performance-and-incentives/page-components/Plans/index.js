import { TabPanel, Tabs } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import IncentivePlans from './components/IncentivePlans';
import ScoringPlans from './components/ScoringPlans';
import TAB_PANNEL_KEYS from './constants/tab-pannel-keys-mapping';
import styles from './styles.module.css';

const { SCORING_PLANS, INCENTIVE_PLANS } = TAB_PANNEL_KEYS;

const TAB_PANNEL_COMPONENT_MAPPING = {
	[SCORING_PLANS]: {
		name      : SCORING_PLANS,
		title     : startCase(SCORING_PLANS),
		Component : ScoringPlans,
	},
	[INCENTIVE_PLANS]: {
		name      : INCENTIVE_PLANS,
		title     : startCase(INCENTIVE_PLANS),
		Component : IncentivePlans,
	},
};

function Plans() {
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

export default Plans;
