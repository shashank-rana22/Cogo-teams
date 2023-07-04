import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const columns = ['code', 'currency', 'price', 'unit'];

function ShowLineItems({ lineItems = [] }) {
	return (
		<>
			<div style={{ display: 'flex' }}>
				{columns.map((item) => (
					<p key={item} className={styles.labelText}>{startCase(item)}</p>
				))}
			</div>
			<div style={{ display: 'flex' }}>
				{columns.map((item) => (
					<p key={item} className={styles.valueText}>{startCase(lineItems[item])}</p>
				))}
			</div>
		</>
	);
}

export default ShowLineItems;
