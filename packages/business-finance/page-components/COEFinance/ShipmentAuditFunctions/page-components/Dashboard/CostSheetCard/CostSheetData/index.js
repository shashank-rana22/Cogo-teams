import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyStateDocs from '../../../../../../commons/EmptyStateDocs';

import ServiceAndLineItems from './ServiceAndLineItems';
import styles from './styles.module.css';
import Total from './Total';

function CostSheetData({
	costViewData = {},
	costViewDataLoading = false,
}) {
	const services = [{ service: 'fcl', cost: '1999' }, { service: 'lcl', cost: '222' },
		{ service: 'ftl', cost: '789' }];

	if (costViewDataLoading) {
		return (
			<div className={styles.loader_main}>
				<Loader className={styles.loader} />
			</div>
		);
	}
	if (isEmpty(costViewData)) {
		return <EmptyStateDocs />;
	}

	return (
		<div>
			<div className={styles.header} />
			{Object.keys(costViewData)?.map((service) => (
				<ServiceAndLineItems
					service={service}
					key={service}
					serviceDetails={costViewData[service]}
				/>
			))}
			<Total services={services} />
		</div>
	);
}

export default CostSheetData;
