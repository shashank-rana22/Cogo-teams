import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import IncentivePlans from './components/IncentivePlans';
import QuestPlans from './components/QuestPlans';
import ScoringPlans from './components/ScoringPlans';
import TAB_PANNEL_KEYS from './constants/tab-pannel-keys-mapping';
import styles from './styles.module.css';

const { SCORING_PLANS, INCENTIVE_PLANS, QUEST_PLANS } = TAB_PANNEL_KEYS;

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
	[QUEST_PLANS]: {
		name      : QUEST_PLANS,
		title     : startCase(QUEST_PLANS),
		Component : QuestPlans,
	},
};

function Plans() {
	const router = useRouter();
	const { query: { tab = SCORING_PLANS } } = router;

	const handleTabChange = (value) => {
		router.push(`/performance-and-incentives/plans?tab=${value}`);
	};

	return (
		<section className={styles.container}>
			<Tabs
				activeTab={tab}
				onChange={handleTabChange}
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
	);
}

export default Plans;
