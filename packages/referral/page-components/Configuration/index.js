import React from 'react';

import useGetReferralConfig from '../../hooks/useGetReferralConfig';

import KYCRule from './KycRule';
import ShipmentRule from './ShipmentRule';
import styles from './styles.module.css';
import SubscriptionRule from './SubscriptionRule';

const DEFAULT_VALUE = 0;

function Configuration() {
	const { configData = [], loading = false } = useGetReferralConfig();
	const kycData = configData.filter((item) => item?.event === 'kyc_verified')[DEFAULT_VALUE];
	const shipmentData = configData.filter((item) => item?.event === 'shipment')[DEFAULT_VALUE];
	const subscriptionData = configData.filter((item) => item?.event === 'subscription')[DEFAULT_VALUE];

	return (
		<div>
			<div className={styles.heading}>Referral- Configuration</div>
			<KYCRule kycData={kycData} dataLoading={loading} />
			<ShipmentRule shipmentData={shipmentData} dataLoading={loading} />
			<SubscriptionRule subscriptionData={subscriptionData} dataLoading={loading} />
		</div>
	);
}

export default Configuration;
