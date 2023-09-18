import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import NoDataState from '../../../../../common/NoDataState';
import { COLOR_MAPPINGS } from '../../../../../constants/pie_chart_config';
import useGetFclFreightRateTrends from '../../../../../hooks/useGetFclFreightRateTrends';
import SeriesChart from '../SeriesChart';
import styles from '../styles.module.css';

const FCL_VALID_IDS = ['supply', 'rate_extension', 'cluster_extension'];
const AIR_IDS = ['cargo_ai', 'freight_look', 'manual', 'rate_extension', 'rate_sheet'];

function Trend({
	parent_mode = null,
	isAnimating = false,
	isHighlighted = false,
	globalFilters = {},
}) {
	const { service_type = 'fcl' } = globalFilters;
	const VALID_IDS = service_type === 'fcl' ? FCL_VALID_IDS : AIR_IDS;
	const IDS = parent_mode ? [parent_mode] : VALID_IDS;
	const { loading, trendsData } = useGetFclFreightRateTrends({ filters: globalFilters });
	const filteredDataForChart = trendsData?.map(({ predicted, ...rest }) => ({ ...rest })) || [];

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
				{(loading || !isEmpty(trendsData))
					? (
						<SeriesChart loading={loading} data={filteredDataForChart} seriesIds={IDS} />
					)
					: <NoDataState flow="column" />}
			</div>
		</div>
	);
}

export default Trend;
