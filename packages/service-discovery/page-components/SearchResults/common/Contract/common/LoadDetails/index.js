import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function LoadDetails({ detail = {} }) {
	const { container_type, container_size, commodity } = detail;

	return (
		<div className={styles.container}>
			{container_size ? (
				<span className={styles.load_item}>
					{container_size === '20' || container_size === '40'
						? `${container_size}ft`
						: container_size}
				</span>
			) : null}

			{container_type ? (
				<span className={styles.load_item}>{startCase(container_type)}</span>
			) : null}

			<span className={styles.load_item}>
				{startCase(commodity) || 'All Commodities'}
			</span>
		</div>
	);
}

export default LoadDetails;
