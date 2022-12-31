import { Pill } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function PillsInput(props) {
	return (
		<section className={styles.container}>
			<Pill {...props} />
		</section>
	);
}

export default PillsInput;
