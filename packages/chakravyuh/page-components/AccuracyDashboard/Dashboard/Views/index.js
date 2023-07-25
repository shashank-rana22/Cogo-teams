import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import { section_container, section_header } from '../styles.module.css';

import styles from './styles.module.css';

const OPTIONS = [
	{
		key              : 'view_details',
		heading          : 'Rate DrillDown',
		highlight_key    : 'spot_search_to_checkout_count',
		highlight_suffix : '% Dropoffs',
		highlight_info   : 'From Search to Checkout',
	},
	{
		key              : 'map_view',
		heading          : 'Map View',
		highlight_key    : 'rate_count_with_deviation_more_than_30',
		highlight_suffix : ' Rates',
		highlight_info   : 'With Deviation more than 30%',
	},
];

function Views({ setView = () => {}, data = {} }) {
	const handleClick = (key) => {
		setView(key === 'view_details' ? 'drilldown' : key);
	};

	return (
		<div className={cl`${styles.container} ${section_container}`}>
			{OPTIONS.map(({ key, highlight_key, heading, highlight_info, highlight_suffix }) => (
				<div className={styles.card} key={key}>
					<h3 className={section_header}>{heading}</h3>
					<div className={styles.flex_between}>
						<div className={styles.highlight_container}>
							<h1>
								{`${getByKey(data, highlight_key)
									|| GLOBAL_CONSTANTS.zeroth_index} ${highlight_suffix}`}
							</h1>
							<p>{highlight_info}</p>
						</div>
						<Button
							onClick={() => handleClick(key)}
							themeType="secondary"
							className={styles.custom_btn}
						>
							{startCase(key)}
							<span className={styles.arrow_right}>&gt;</span>
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}

export default Views;
