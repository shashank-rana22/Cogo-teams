import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import AccountLeaderboard from './components/AccountLeaderboard';
import EngagementScoring from './components/EngagementScoring';
import styles from './styles.module.css';

const TAB_PANEL_MAPPING = {
	account_leaderboard: {
		name      : 'account_leaderboard',
		title     : 'Account Leaderboard',
		Component : AccountLeaderboard,
	},

	engagement_scoring: {
		name      : 'engagement_scoring',
		title     : 'Engagement Scoring',
		Component : EngagementScoring,
	},
};

function AccountScoring() {
	const [primaryTab, setPrimaryTab] = useState('account_leaderboard');
	return (
		<section className={styles.container}>
			<div className={styles.heading_container}>Account Engagement Scoring</div>

			<div className={styles.tab_list}>
				<Tabs activeTab={primaryTab} themeType="primary" onChange={setPrimaryTab}>
					{Object.values(TAB_PANEL_MAPPING).map((item) => {
						const { name = '', title = '', Component } = item;

						if (!Component) return null;

						return (
							<TabPanel key={name} name={name} title={title}>
								<Component />
							</TabPanel>
						);
					})}

				</Tabs>

			</div>

		</section>
	);
}

export default AccountScoring;
