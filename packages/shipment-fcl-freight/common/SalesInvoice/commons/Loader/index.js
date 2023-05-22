import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.container}>
			<Placeholder className={styles.custom_styles} />
			<Placeholder className={styles.custom_styles} />
			<Placeholder className={styles.custom_styles} />
			<Placeholder className={styles.custom_styles} />
		</div>
	);
}

export default Loader;
