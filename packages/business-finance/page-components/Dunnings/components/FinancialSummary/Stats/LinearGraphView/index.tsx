import { ResponsiveLine, LineSvgProps } from '@cogoport/charts/line';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from '../styles.module.css';

interface Props {
	linearData?: LineSvgProps['data'];
}

function LinearGraphView({ linearData = [] }: Props) {
	const [totalOutstanding] = linearData;
	const { data } = totalOutstanding || {};
	const geo = getGeoConstants();
	const currency = geo.country.currency.code;
	return (
		<div>
			{(isEmpty(data) || !data) ? (
				<div className={styles.empty_state}>
					<img
						src={GLOBAL_CONSTANTS.image_url.list_no_result_found}
						alt="No Data"
					/>
				</div>
			) : (
				<div className={styles.linear_graph_container}>
					<ResponsiveLine
						data={linearData}
						margin={{ top: 10, right: 120, bottom: 100, left: 90 }}
						xScale={{ type: 'point' }}
						enableGridX={false}
						colors={['#88CAD1', '#F68B21']}
						enableSlices="x"
						yScale={{ type: 'linear', min: 0, max: 'auto' }}
						yFormat={(value) => formatAmount({
							amount  : value,
							currency,
							options : {
								currencyDisplay : 'code',
								style           : 'currency',

							},
						})}
						axisTop={null}
						axisRight={null}
						axisBottom={{
							tickSize       : 5,
							tickPadding    : 10,
							tickRotation   : 0,
							legend         : 'Month',
							legendOffset   : 46,
							legendPosition : 'middle',
						}}
						axisLeft={{
							tickSize       : 5,
							tickPadding    : 5,
							tickRotation   : 0,
							legend         : 'Amount',
							legendOffset   : -84,
							legendPosition : 'middle',
							format         : (value) => formatAmount({
								amount  :	value,
								currency,
								options : {
									currencyDisplay : 'code',
									style           : 'currency',
									notation        : 'compact',
									compactDisplay  : 'short',
								},
							}),
						}}
						pointSize={5}
						pointBorderWidth={2}
						pointBorderColor={{ from: 'serieColor' }}
						pointLabelYOffset={-12}
						useMesh
						legends={[{
							anchor            : 'top-right',
							direction         : 'column',
							justify           : false,
							translateX        : 112,
							translateY        : 0,
							itemsSpacing      : 0,
							itemDirection     : 'left-to-right',
							itemWidth         : 100,
							itemHeight        : 20,
							itemOpacity       : 0.75,
							symbolSize        : 12,
							symbolShape       : 'circle',
							symbolBorderColor : 'rgba(0, 0, 0, .5)',
							effects           : [{
								on    : 'hover',
								style : { itemBackground: 'rgba(0, 0, 0, .03)', itemOpacity: 1 },
							}],
						}]}
					/>
				</div>
			)}
		</div>
	);
}

export default LinearGraphView;
