import { Placeholder } from '@cogoport/components';
import { useState } from 'react';

import { shipmentIncentives, subscriptionIncentives } from '../../../configurations/business-incentives';
import useGetReferralBusinessAnalytics from '../../../hooks/useGetReferralBusinessAnalytics';

import BusinessRewards from './BusinessRewards';
import BusinessStats from './BusinessStats';
import styles from './styles.module.css';

const SHIPMENT_SUBSCRIPTION_DEFAULT_NUMBER = 0;

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

	const businessProps = {
		businessFilterType,
		setBusinessFilterType,
		selectedDate,
	};

	return (
		<div className={styles.container}>
			<div className={styles.stats_container}>
				<div className={styles.wrapper}>
					<div className={styles.header}>Shipment  Incentives</div>
					<div className={styles.card}>
						{shipmentIncentives.map(({ label, name }) => (
							<div className={styles.stats_div} key={name}>
								{loading ? <Placeholder height="30px" width="100%" /> : (
									<div className={styles.number}>
										{shipment[name] || SHIPMENT_SUBSCRIPTION_DEFAULT_NUMBER}
									</div>
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
									<div className={styles.number}>
										{subscription[name] || SHIPMENT_SUBSCRIPTION_DEFAULT_NUMBER}
									</div>
								)}
								<div className={styles.sub_text}>{label}</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.title}>Business that are</div>
			<div className={styles.tab_container}>
				<BusinessStats {...businessProps} />
			</div>
			<div className={styles.header}>Rewards</div>
			<BusinessRewards {...businessProps} />

		</div>
	);
}

export default BusinessPerformance;
