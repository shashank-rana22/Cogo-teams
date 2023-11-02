import { startCase } from '@cogoport/utils';
import React from 'react';

import LineItem from './LineItem';
import styles from './styles.module.css';

function ServiceAndLineItems({
	service = '',
	serviceDetails = [],
}) {
	return (
		<div className={styles.container}>
			<div className={styles.service_name}>
				<div className={styles.sub_content}>{startCase(service)}</div>
				<div className={styles.sub_content}>INR 40000</div>
				<div className={styles.sub_content}>INR 50000</div>
			</div>
			{serviceDetails?.map((item) => (
				<LineItem
					lineItem={item}
					key={item?.id}
				/>
			))}
			<div className={styles.line} />
		</div>
	);
}

export default ServiceAndLineItems;
