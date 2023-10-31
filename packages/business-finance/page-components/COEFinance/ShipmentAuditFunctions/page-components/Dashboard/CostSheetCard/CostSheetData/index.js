import React from 'react';

import ServiceAndLineItems from './ServiceAndLineItems';
import styles from './styles.module.css';
import Total from './Total';

function CostSheetData() {
	const services = [{ service: 'fcl', cost: '1999' }, { service: 'lcl', cost: '222' },
		{ service: 'ftl', cost: '789' }];
	return (
		<div>
			<div className={styles.header} />
			{services?.map((item) => (
				<ServiceAndLineItems
					key={item?.service}
					item={item}
				/>
			))}
			<Total services={services} />
		</div>
	);
}

export default CostSheetData;
