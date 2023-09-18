import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import NoDataState from '../../../../../common/NoDataState';
import { COLOR_MAPPINGS } from '../../../../../constants/pie_chart_config';
import SeriesChart from '../SeriesChart';
import styles from '../styles.module.css';

const VALID_IDS = ['supply', 'rate_extension', 'predicted', 'cluster_extension'];

function RateAccuracy({
	accuracy = [],
	loading = false, parent_mode = null,
	isAnimating = false,
	isHighlighted = false,
}) {
	const IDS = parent_mode ? [parent_mode] : VALID_IDS;

	return (
		<div className={cl`${styles.rate_accuracy_chart_container} 
		${isHighlighted ? styles.highlighted_container : ''}`}
		>
			<div className={styles.legends}>
				{IDS.map((key) => (
					<div className={styles.legend_item} key={key}>
						<div
							className={styles.circle}
							style={{ background: `${COLOR_MAPPINGS[key][GLOBAL_CONSTANTS.zeroth_index]}` }}
						/>
						{startCase(key)}
					</div>
				))}
			</div>
			<div className={cl`${styles.chart_container} ${isAnimating ? styles.blur : ''}`}>
				{(loading || !isEmpty(accuracy))
					? (
						<SeriesChart loading={loading} data={accuracy} seriesIds={IDS} />
					)
					: <NoDataState flow="column" />}
			</div>
		</div>
	);
}

export default RateAccuracy;
