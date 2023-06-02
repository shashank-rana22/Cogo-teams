import { Placeholder } from '@cogoport/components';
import { useState } from 'react';

import { shipmentIncentives, subscriptionIncentives } from '../../../configurations/business-incentives';
import useGetReferralBusinessAnalytics from '../../../hooks/useGetReferralBusinessAnalytics';

import BusinessRewards from './BusinessRewards';
import BusinessStats from './BusinessStats';
import styles from './styles.module.css';

function BusinessPerformance({ selectedDate = {} }) {
	const [businessFilterType, setBusinessFilterType] = useState({
		activityType : 'total',
		rewardType   : 'total',
	});

	const { data = {}, loading = false } = useGetReferralBusinessAnalytics({
		selectedDate,
		businessFilterType,
		type: 'incentive',
	});

	const { shipment = {}, subscription = {} } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.stats_container}>
				<div className={styles.wrapper}>
					<div className={styles.header}>Shipment  Incentives</div>
					<div className={styles.card}>
						{shipmentIncentives.map(({ label, name }) => (
							<div className={styles.stats_div} key={name}>
								{loading ? <Placeholder height="30px" width="100%" /> : (
									<div className={styles.number}>{shipment[name] || 0}</div>
								)}
								<div className={styles.sub_text}>{label}</div>
							</div>
						))}
					</div>
				</div>
				<div className={styles.wrapper}>
					<div className={styles.header}>Subscription Incentives</div>
					<div className={styles.card}>
						{subscriptionIncentives.map(({ label, name }) => (
							<div className={styles.stats_div} key={name}>
								{loading ? <Placeholder height="30px" width="100%" /> : (
									<div className={styles.number}>{subscription[name] || 0}</div>
								)}
								<div className={styles.sub_text}>{label}</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.title}>Business that are</div>
			<div className={styles.tab_container}>
				<BusinessStats
					businessFilterType={businessFilterType}
					setBusinessFilterType={setBusinessFilterType}
					selectedDate={selectedDate}
				/>
			</div>
			<div className={styles.header}>Rewards</div>
			<BusinessRewards
				businessFilterType={businessFilterType}
				setBusinessFilterType={setBusinessFilterType}
				selectedDate={selectedDate}
			/>

		</div>
	);
}

export default BusinessPerformance;
