import React, { useState } from 'react';

import useGetSaasContainerSubscription from '../../../../hooks/useGetSaasContainerSubscription';

import Body from './Body';
import Header from './Header';
import styles from './styles.module.css';

function Tracking({ shipmentData = {} }) {
	const [containerNo, setContainerNo] = useState('');

	const { loading, data: list } = useGetSaasContainerSubscription({
		shipmentId: '3534d9b2-7a8c-47a0-a3d1-93cfb7bf9f69' || shipmentData?.id,
	});

	const ContainerOptions = Array.isArray(list)
		? (list || [])
			.filter((e) => e?.type === 'CONTAINER_NO')
			?.map((e) => ({ label: e?.input, value: e?.input }))
		: [];

	const trackingData = Array.isArray(list)
		? (list || []).filter(
			(e) => e?.input === (containerNo || ContainerOptions?.[0]?.value),
		)
		: [];

	return (
		<div className={styles.container}>
			<Header
				ContainerOptions={ContainerOptions}
				setContainerNo={setContainerNo}
				containerNo={containerNo || ContainerOptions?.[0]?.value}
				shipmentId={shipmentData?.id}
			/>
			<Body list={trackingData} loading={loading} />
		</div>
	);
}

export default Tracking;
