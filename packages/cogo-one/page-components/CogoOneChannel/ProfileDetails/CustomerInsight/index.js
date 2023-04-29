/* eslint-disable max-len */
import { Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import SERVICE_TYPE_OPTIONS from '../../../../configurations/service-type-options';
import useGetOmnichannelCustomerInsights from '../../../../hooks/useGetOmnichannelCustomerInsights';
import FormatData from '../../../../utils/formatData';

import InsightsList from './InsightsList';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function CustomerInsight({ activeTab, activeVoiceCard, activeMessageCard, customerId, formattedMessageData }) {
	const { sender = null } = formattedMessageData;
	const [serviceType, setServiceType] = useState('fcl_freight');

	const { userId = '', userMobile = '' } = FormatData({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
	});

	const emptyCheck = !(isEmpty(userId)) || !(isEmpty(userMobile));

	const {
		data = {},
		loading = false,
	} = useGetOmnichannelCustomerInsights({ serviceType, activeTab, activeVoiceCard, activeMessageCard, customerId, sender });

	const { shipment_and_spot_search_stats = {}, total_messages } = data || {};

	const everyEmpty = () => {
		let check = false;
		Object.keys(shipment_and_spot_search_stats).forEach((item) => {
			const {
				last_shipment_data = {},
				shipment_insights = {},
			} = shipment_and_spot_search_stats[item];

			if (!isEmpty(last_shipment_data) || !isEmpty(shipment_insights?.list)) {
				check = true;
			}
		});
		return !check;
	};

	const checkEmpty = isEmpty(shipment_and_spot_search_stats) || everyEmpty() || !(emptyCheck);

	useEffect(() => {
		setServiceType('fcl_freight');
	}, [customerId]);

	return (
		<div className={styles.container} key={customerId}>
			<div className={styles.wrap}>
				<div className={styles.title}>Customer Insight</div>

				<Select
					disabled={loading}
					value={serviceType}
					onChange={setServiceType}
					options={SERVICE_TYPE_OPTIONS}
				/>
			</div>

			<div className={styles.organisation_container}>
				{loading
					? <LoadingState />
					: (
						<InsightsList
							checkEmpty={checkEmpty}
							total_messages={total_messages}
							shipment_and_spot_search_stats={shipment_and_spot_search_stats}
						/>
					)}
			</div>
		</div>
	);
}

export default CustomerInsight;
