import { Tabs, TabPanel } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import AccountLeaderboard from './components/AccountLeaderboard';
import EngagementScoring from './components/EngagementScoring';
import styles from './styles.module.css';

const getTabPanelMapping = ({ t }) => ({
	account_leaderboard: {
		name      : 'account_leaderboard',
		title     : t('allocation:account_leaderboard'),
		Component : AccountLeaderboard,
	},

	engagement_scoring: {
		name      : 'engagement_scoring',
		title     : t('allocation:engagement_scoring'),
		Component : EngagementScoring,
	},
});

function AccountScoring() {
	const { t } = useTranslation(['allocation']);

	const [primaryTab, setPrimaryTab] = useState('account_leaderboard');

	const tabPanelMapping = getTabPanelMapping({ t });

	return (
		<section className={styles.container}>
			<div className={styles.heading_container}>{t('allocation:account_engagement_scoring')}</div>

			<div className={styles.tab_list}>
				<Tabs activeTab={primaryTab} themeType="primary" onChange={setPrimaryTab}>
					{Object.values(tabPanelMapping).map((item) => {
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
