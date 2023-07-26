import { IcMFilter } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function MultipleFilters() {
	return (
		<div className={styles.filter}>
			<IcMFilter color="#fff" height="80%" width="100%" />
		</div>
	);
}

export default MultipleFilters;
