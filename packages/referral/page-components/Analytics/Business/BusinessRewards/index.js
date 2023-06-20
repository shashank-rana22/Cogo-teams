import { TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import { BUSINESS_REWARDS_OPTIONS } from '../../../../constants';
import useGetReferralBusinessAnalytics from '../../../../hooks/useGetReferralBusinessAnalytics';

import BusinessRewardStats from './BusinessRewardStats';
import styles from './styles.module.css';

const DEFAULT_COUNT_VALUE = 0;

function BusinessRewards({ businessFilterType = {}, setBusinessFilterType = () => {}, selectedDate = {} }) {
	const { data: businessData = {}, loading = false } = useGetReferralBusinessAnalytics({
		selectedDate,
		businessFilterType,
		type: 'reward',
	});

	const { count = {}, data = {} } = businessData || {};
	const { kyc_verified = 0, shipment = 0, subscription = 0 } = count || {};
	const totalBusinessReward = kyc_verified + shipment + subscription;

	const formatCount = {
		total: totalBusinessReward,
		kyc_verified,
		shipment,
		subscription,
	};

	const newData = Object.keys(data || {}).map((item) => ({
		x: formatDate({
			date       : item,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		}),
		y: data[item] || DEFAULT_COUNT_VALUE,
	}));

	const graphData = [
		{
			id   : 'date',
			data : newData.reverse(),
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.tab_container}>
				<Tabs
					activeTab={businessFilterType.rewardType}
					themeType="secondary-vertical"
					onChange={(val) => setBusinessFilterType((prev) => ({ ...prev, rewardType: val }))}
				>
					{BUSINESS_REWARDS_OPTIONS.map((item) => {
						const { label, name } = item || {};
						return (
							<TabPanel name={name} title={label} badge={formatCount[name]} key={name} />
						);
					})}

				</Tabs>
				{businessFilterType.rewardType && (
					<BusinessRewardStats graphData={graphData} loading={loading} />
				)}
			</div>
		</div>
	);
}

export default BusinessRewards;
