import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function TruckDetails({ data = {} }) {
	const { trucks_count, truck_type = '', trade_type = '' } = data;
	return (
		<div className={styles.container}>
			<div className={styles.trucks_count}>
				<Pill>
					{trucks_count}
					{' '}
					Trucks
				</Pill>
				<Pill>{trade_type}</Pill>
			</div>
			<Pill>{startCase(truck_type)}</Pill>
		</div>
	);
}

export default TruckDetails;
