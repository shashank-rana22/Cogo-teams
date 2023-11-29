import { Pill, Table } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import serviceWiseColumns from './get-service-wise-columns';
import styles from './styles.module.css';

function ServiceWiseCard({
	item = {},
}) {
	return (
		<div className={styles.card}>
			<span className={styles.pill}>
				<Pill>{startCase(item?.serviceType)}</Pill>
			</span>

			<Table columns={serviceWiseColumns} data={[item]} className={styles.table} />

		</div>
	);
}

export default ServiceWiseCard;
