import { TabPanel, Tabs } from '@cogoport/components';

import { BUSINESS_REWARDS_OPTIONS } from '../../../../constants';

import BusinessRewardStats from './BusinessRewardStats';
import styles from './styles.module.css';

function BusinessRewards({ businessFilterType = {}, setBusinessFilterType = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.tab_container}>
				<Tabs
					activeTab={businessFilterType.rewardType}
					themeType="secondary-vertical"
					onChange={(val) => setBusinessFilterType((prev) => ({ ...prev, rewardType: val }))}
				>
					{BUSINESS_REWARDS_OPTIONS.map(({ label, name, badge }) => (
						<TabPanel name={name} title={label} badge={badge} key={name} />
					))}

				</Tabs>
				{businessFilterType.rewardType && (
					<BusinessRewardStats />
				)}
			</div>
		</div>
	);
}

export default BusinessRewards;
