import { cl, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import NoDataState from '../../../../../common/NoDataState';
import { COLOR_MAPPINGS } from '../../../../../constants/pie_chart_config';
import useGetFclFreightRateTrends from '../../../../../hooks/useGetFclFreightRateTrends';
import SeriesChart from '../SeriesChart';
import styles from '../styles.module.css';

const FCL_VALID_IDS = ['supply', 'rate_extension', 'cluster_extension'];
const AIR_IDS = ['cargo_ai', 'freight_look', 'manual', 'rate_extension', 'rate_sheet'];

const VIEW_TYPE_OPTIONS = [
	{
		value : 'average_price',
		label : 'Average Price',
	},
	{
		value : 'max_price',
		label : 'Max Price',
	},
	{
		value : 'min_price',
		label : 'Min Price',
	},
];

function Trend({
	parent_mode = null,
	isAnimating = false,
	isHighlighted = false,
	globalFilters = {},
}) {
	const { service_type = 'fcl' } = globalFilters;
	const [viewType, setViewType] = useState('average_price');
	const VALID_IDS = service_type === 'fcl' ? FCL_VALID_IDS : AIR_IDS;
	const IDS = parent_mode ? [parent_mode] : VALID_IDS;
	const { loading, data: trendsData } = useGetFclFreightRateTrends({ filters: globalFilters });
	const filteredDataForChart = trendsData?.map((item) => {
		const NEW_OBJ = {};
		Object.entries(item).forEach(([key, value]) => {
			if (key !== 'predicted') {
				if (typeof (value) === 'object') {
					Object.entries(value || {}).forEach(([type, count]) => {
						if (type === viewType)NEW_OBJ[key] = count;
					});
				} else NEW_OBJ[key] = value;
			}
		});
		return NEW_OBJ;
	});

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
				<Select
					size="sm"
					style={{ width: '150px' }}
					placeholder="Select"
					value={viewType}
					onChange={setViewType}
					options={VIEW_TYPE_OPTIONS}
				/>
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
