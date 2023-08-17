import React from 'react';

import useGetSaasAirSubscription from '../../hooks/useGetSaasAirSubscription';

import Body from './Body';
import Header from './Header';
import styles from './styles.module.css';

function Tracking({ shipmentData = {} }) {
	const { loading, list } = useGetSaasAirSubscription({
		shipmentId: shipmentData?.id,
	});
	return (
		<div className={styles.container}>
			<Header
				airwayBillNo={list?.airway_bill_no}
				shipmentId={shipmentData?.id}
			/>
			<Body list={list} loading={loading} />
		</div>
	);
}

export default Tracking;
