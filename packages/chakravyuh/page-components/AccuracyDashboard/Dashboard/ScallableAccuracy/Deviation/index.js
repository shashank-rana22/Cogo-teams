import { cl } from '@cogoport/components';
import {
	isEmpty,
} from '@cogoport/utils';
import React from 'react';

import NoDataState from '../../../../../common/NoDataState';
import useGetFclFreightRateTrends from '../../../../../hooks/useGetFclFreightRateTrends';
import SeriesChart from '../SeriesChart';
import styles from '../styles.module.css';

const FCL_VALID_IDS = ['supply', 'rate_extension', 'cluster_extension'];
const AIR_IDS = ['cargo_ai', 'freight_look', 'manual', 'rate_extension', 'rate_sheet'];

function Deviation({
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

export default Deviation;
