import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import { section_container, section_header } from '../styles.module.css';

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

function Views({ setView = () => {} }) {
	const handleClick = (key) => {
		if (key === 'view_details') {
			setView('drilldown');
		}
	};

	return (
		<div className={cl`${styles.container} ${section_container}`}>
			{OPTIONS.map(({ key, highlight_key, heading, highligh_suffix }) => {
				const highlightText = startCase(highlight_key.split('_')[GLOBAL_CONSTANTS.zeroth_index]);

				return (
					<div className={styles.card} key={key}>
						<h3 className={section_header}>{heading}</h3>
						<div className={styles.flex_between}>
							<div className={styles.highlight_container}>
								<h1>
									{`${getByKey(DATA, highlight_key)} ${highlightText}`}
								</h1>
								<p>{highligh_suffix}</p>
							</div>
							<Button
								onClick={() => handleClick(key)}
								themeType="secondary"
							>
								{startCase(key)}
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
