import { Chips } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ShippingLine({ cargo_types = [] }) {
	return (
		<div>
			<div className={styles.title}>Cargo Type</div>
			<Chips
				items={cargo_types.map((x) => ({
					children: x.cargo_type.replaceAll('_', ' '),
				}))}
			/>
		</div>
	);
}

export default ShippingLine;
