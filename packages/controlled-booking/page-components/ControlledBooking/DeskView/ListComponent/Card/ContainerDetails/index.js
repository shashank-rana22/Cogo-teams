import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ContainerDetails({ details }) {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				{details.container_size}
				ft
			</div>

			<div className={styles.text}>
				{details.containers_count}
				{' '}
				Container
			</div>

			<div className={styles.text}>{startCase(details.container_type)}</div>

			<div className={styles.text}>{startCase(details.commodity)}</div>

			<div className={styles.text}>
				{details.cargo_weight_per_container}
				Mt
			</div>

			<div className={styles.text}>
				Cargo Value:
				{' '}
				{details.cargo_value}
				{' '}
				{details.cargo_value_currency}

			</div>

		</div>
	);
}

export default ContainerDetails;
