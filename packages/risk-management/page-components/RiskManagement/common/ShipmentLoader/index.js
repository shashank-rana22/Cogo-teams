import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ShipmentLoader() {
	return (
		<div>
			<Placeholder className={styles.loader} />
		</div>
	);
}

export default ShipmentLoader;
