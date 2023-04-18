import React from 'react';

import useGetRules from '../../hooks/useGetRules';

import KYCRule from './KYCRule';
import ShipmentRule from './ShipmentRule';
import styles from './styles.module.css';
import SubscriptionRule from './SubscriptionRule';

function Configuration() {
	const { data, loading : dataLoading } = useGetRules();
	const kycData = data?.data?.filter((item) => item?.event === 'kyc_verified')[0];
	const shipmentData = data?.data?.filter((item) => item?.event === 'shipment')[0];
	const subscriptionData = data?.data?.filter((item) => item?.event === 'subscription')[0];

	return (
		<div>
			<div className={styles.heading}>Referral- Configuration</div>
			<KYCRule kycData={kycData} dataLoading={dataLoading} />
			<ShipmentRule shipmentData={shipmentData} dataLoading={dataLoading} />
			<SubscriptionRule subscriptionData={subscriptionData} dataLoading={dataLoading} />
		</div>
	);
}

export default Configuration;
