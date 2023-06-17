import { Accordion } from '@cogoport/components';
import React from 'react';

import TableDisplay from '../TablesDisplay';

import styles from './styles.module.css';

function AccordianDisplay() {
	return (
		<div className={styles.container}>
			<Accordion title="KRA NAME">
				<TableDisplay />
			</Accordion>
		</div>
	);
}

export default AccordianDisplay;
