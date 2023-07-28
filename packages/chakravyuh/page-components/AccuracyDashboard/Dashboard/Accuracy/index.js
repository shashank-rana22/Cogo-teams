import { ResponsiveLine } from '@cogoport/charts/line';
import { Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import CustomTooltip from '../../../../common/CustomTooltip';
import NoDataState from '../../../../common/NoDataState';
import { CUSTOM_THEME } from '../../../../constants/line_chart_config';
import { section_header, section_container } from '../styles.module.css';

import styles from './styles.module.css';

const CONSTANT_POINT_TWO = 0.2;
const TICK_SIZE = 5;
const MAX_LEGENDS = 4;

function Accuracy({ data = [], loading = true }) {
	const ColorMappings = {
		predicted         : ['#F9AE64'],
		supply_rates      : ['#63BEC8'],
		rate_extension    : ['#9BA0CB'],
		cluster_extension : ['#f37166'],
	};
	const isEmptyData = !data
						|| (Array.isArray(data) && data.length === GLOBAL_CONSTANTS.zeroth_index)
						|| (Object.values(data).reduce(
							(total, item) => total + (item?.data?.length || GLOBAL_CONSTANTS.zeroth_index),
							GLOBAL_CONSTANTS.zeroth_index,
						) === GLOBAL_CONSTANTS.zeroth_index);
	return (
		<div className={cl`${styles.container} ${section_container}`}>
			<h3 className={section_header}>Rate Accuracy with Time</h3>
			<div className={styles.line_chart_container}>
				{ !loading
					? (
						<ResponsiveLine
							data={data}
							margin={{ top: 50, right: 20, bottom: 60, left: 50 }}
							xScale={{ type: 'point' }}
							yScale={{
								type    : 'linear',
								min     : '0',
								max     : '100',
								stacked : false,
								reverse : false,
							}}
							yFormat=" >-.0f"
							axisTop={null}
							axisRight={null}
							axisBottom={{
								tickSize       : 5,
								tickPadding    : 5,
								legendOffset   : 36,
								legendPosition : 'middle',
								tickRotation   : -60,
								styles         : { transform: 'rotate(-45deg' },
								format         : (val) => formatDate({
									date       : val,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
								}),
							}}
							axisLeft={{
								tickSize       : 5,
								tickPadding    : 5,
								tickRotation   : 0,
								legendOffset   : -40,
								legendPosition : 'middle',
								format         : (val) => `${val}%`,
								tickValues     : [...new Array(TICK_SIZE).keys()]
									.map((i) => i * (TICK_SIZE * TICK_SIZE)),
							}}
							enableGridX
							enableGridY
							gridYValues={[GLOBAL_CONSTANTS.zeroth_index]}
							gridXValues={[GLOBAL_CONSTANTS.zeroth_index]}
							theme={CUSTOM_THEME}
							colors={data.map(({ id }) => ColorMappings[id])}
							pointSize={6}
							pointColor={{ from: 'color', modifiers: [['brighter', CONSTANT_POINT_TWO]] }}
							pointBorderWidth={2}
							pointBorderColor={{ from: 'color', modifiers: [['darker', CONSTANT_POINT_TWO]] }}
							pointLabelYOffset={-12}
							useMesh
							enableSlices="x"
							legends={[
								{
									anchor            : 'top-left',
									direction         : 'row',
									justify           : false,
									translateX        : -35,
									translateY        : -45,
									itemsSpacing      : 0,
									itemDirection     : 'left-to-right',
									itemWidth         : 140,
									itemHeight        : 20,
									itemOpacity       : 1,
									symbolSize        : 12,
									symbolShape       : 'circle',
									symbolBorderColor : 'rgba(0, 0, 0, .5)',
									effects           : [
										{
											on    : 'hover',
											style : {
												itemOpacity: 1,
											},
										},
									],
								},
							]}
							tooltip={CustomTooltip}
						/>
					)
					: (
						<div className={styles.loading}>
							<div className={styles.legends}>
								{
									[...new Array(MAX_LEGENDS).keys()].map((key) => (
										<Placeholder key={key} height="20px" width="16%" />
									))
								}
							</div>
							<Placeholder height="180px" />
						</div>
					)}
				{isEmptyData && <NoDataState flow="column" visible={!loading} />}
			</div>
		</div>
	);
}

export default Accuracy;
