import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import { shipmentIncentives, subscriptionIncentives } from '../../../configurations/business-incentives';
import { BUSINESS_TAB_OPTIONS } from '../../../constants';

import BusinessRewards from './BusinessRewards';
import BusinessStats from './BusinessStats';
import styles from './styles.module.css';

function BusinessPerformance() {
	const [businessFilterType, setBusinessFilterType] = useState({
		activityType : 'signed_up',
		rewardType   : 'total',
	});
	return (
		<div className={styles.container}>
			<div className={styles.stats_container}>
				<div className={styles.wrapper}>
					<div className={styles.header}>Shipment  Incentives</div>
					<div className={styles.card}>
						{shipmentIncentives.map(({ label, number, name }) => (
							<div className={styles.stats_div} key={name}>
								<div className={styles.number}>{number}</div>
								<div className={styles.sub_text}>{label}</div>
							</div>
						))}
					</div>
				</div>
				<div className={styles.wrapper}>
					<div className={styles.header}>Subscription Incentives</div>
					<div className={styles.card}>
						{subscriptionIncentives.map(({ label, number, name }) => (
							<div className={styles.stats_div} key={name}>
								<div className={styles.number}>{number}</div>
								<div className={styles.sub_text}>{label}</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.title}>Business that are</div>
			<div className={styles.tab_container}>
				<Tabs
					activeTab={businessFilterType?.activityType}
					themeType="primary-vertical"
					onChange={(val) => setBusinessFilterType((prev) => ({ ...prev, activityType: val }))}
				>
					{BUSINESS_TAB_OPTIONS.map(({ label, name, badge }) => (
						<TabPanel name={name} title={label} badge={badge} key={name} />
					))}

				</Tabs>
				{businessFilterType.activityType && (
					<BusinessStats />
				)}
			</div>
			<div className={styles.header}>Rewards</div>
			<BusinessRewards businessFilterType={businessFilterType} setBusinessFilterType={setBusinessFilterType} />

		</div>
	);
}

export default BusinessPerformance;
