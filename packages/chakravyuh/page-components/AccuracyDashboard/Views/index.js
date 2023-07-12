import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const OPTIONS = [
	{
		key             : 'view_details',
		heading         : 'Rate DrillDown',
		highlight_key   : 'dropoffs_percentage',
		highligh_suffix : 'From Search to Checkout',
	},
	{
		key             : 'map_view',
		heading         : 'Map View',
		highlight_key   : 'rates_count',
		highligh_suffix : 'With Deviation more than 30%',
	},
];

const DATA = { dropoffs_percentage: '93%', rates_count: '4532' };

function Views() {
	return (
		<div className={styles.container}>
			{OPTIONS.map((item) => {
				const highlightText = startCase(item.highlight_key.split('_')[GLOBAL_CONSTANTS.zeroth_index]);

				return (
					<div className={styles.card} key={item.key}>
						<h4>{item.heading}</h4>
						<div className={styles.flex_between}>
							<div className={styles.highlight_container}>
								<h1>
									{`${getByKey(DATA, item.highlight_key)} ${highlightText}`}
								</h1>
								<p>{item.highligh_suffix}</p>
							</div>
							<Button themeType="secondary">
								{startCase(item.key)}
								<span className={styles.arrow_right}>&gt;</span>
							</Button>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Views;
