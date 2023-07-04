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
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{
					lineItems.map((lineItem) => (
						<div key={lineItem} style={{ display: 'flex' }}>
							{
								columns.map((col) => (
									<p key={col} className={styles.valueText}>
										{startCase(lineItem[col])}
									</p>
								))
							}
						</div>
					))
				}

			</div>
		</>
	);
}

export default ShowLineItems;
