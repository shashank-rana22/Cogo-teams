// eslint-disable-next-line import/no-unresolved
import { ResponsiveLine } from '@cogoport/charts/line';
import { DateRangepicker, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/EmptyStateMargins';
import useGetServiceWiseBookingInsights from '../../../hooks/useGetServiceWiseBookingInsights';

import styles from './styles.module.css';

function TransactionFunnelData({ activeService = '' }) {
	const {
		loading = false,
		dateRange,
		setDateRange = () => {},
		chartData = [],
		graphLineColors = {},
		tickValuesForBottomAxis = 1,
	} = useGetServiceWiseBookingInsights({
		activeService,
	});

	if (loading) {
		return <Loader />;
	}

	if (!loading && isEmpty(chartData)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.service_name}>{startCase(activeService)}</div>
				<DateRangepicker
					value={dateRange}
					onChange={setDateRange}
					isPreviousDaysAllowed
					maxDate={new Date()}
				/>
			</div>
			<div>
				<div className={styles.line_chart_container} key={chartData?.length}>
					{!isEmpty(chartData) ? (
						<ResponsiveLine
							data={chartData}
							margin={{
								top    : 50,
								right  : 110,
								bottom : 70,
								left   : 60,
							}}
							xScale={{
								type      : 'time',
								format    : '%Y-%m-%d',
								useUTC    : false,
								precision : 'day',
							}}
							yScale={{
								type    : 'linear',
								min     : 'auto',
								max     : 'auto',
								stacked : false,
								reverse : false,
							}}
							xFormat="time:%Y-%m-%d"
							yFormat=" >-.2f"
							axisTop={null}
							axisRight={null}
							axisBottom={{
								format     : '%b %d',
								tickValues : `every ${tickValuesForBottomAxis} days`,
							}}
							axisLeft={{
								tickValues: 5,
							}}
							curve="monotoneX"
							pointSize={5}
							pointColor={{ theme: 'background' }}
							pointBorderWidth={1}
							pointBorderColor={{ from: 'serieColor' }}
							pointLabelYOffset={-12}
							useMesh
							enablePoints={false}
							enableGridX={false}
							enableSlices="x"
							colors={({ id }) => graphLineColors[id]?.color}
							sliceTooltip={({ slice }) => {
								const spot_search_data = slice.points.filter(
									(item) => item.serieId === 'spot_search_stats',
								);
								const checkout_data = slice.points.filter(
									(item) => item.serieId === 'checkout_stats',
								);
								const shipment_data = slice.points.filter(
									(item) => item.serieId === 'shipment_stats',
								);
								const {
									x: spot_search_date,
									y: spot_search_count,
								} = spot_search_data[GLOBAL_CONSTANTS.zeroth_index]?.data || {};
								const {
									x: checkout_date,
									y: checkout_count,
								} = checkout_data[GLOBAL_CONSTANTS.zeroth_index]?.data || {};
								const {
									x: shipment_date,
									y: shipment_count,
								} = shipment_data[GLOBAL_CONSTANTS.zeroth_index]?.data || {};

								return (
									<div
										style={{
											direction    : 'column',
											padding      : '12px',
											background   : '#fff',
											borderRadius : 4,
										}}
									>
										<div className={styles.flex}>
											<div className={styles.label}>Date: </div>
											<div className={styles.value}>
												{formatDate({
													date       : spot_search_date || checkout_date || shipment_date,
													dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
													formatType : 'date',
												})}
											</div>
										</div>
										<div className={styles.flex}>
											<div className={styles.label}>Spot searches: </div>
											<div className={styles.value}>{spot_search_count}</div>
										</div>
										<div className={styles.flex}>
											<div className={styles.label}>Checkouts: </div>
											<div className={styles.value}>{checkout_count}</div>
										</div>
										<div className={styles.flex}>
											<div className={styles.label}>Shipments: </div>
											<div className={styles.value}>{shipment_count}</div>
										</div>
									</div>
								);
							}}
							legends={[
								{
									anchor            : 'top-left',
									direction         : 'row',
									justify           : false,
									translateX        : -20,
									translateY        : -30,
									itemsSpacing      : 0,
									itemDirection     : 'left-to-right',
									itemWidth         : 140,
									itemHeight        : 20,
									itemOpacity       : 0.75,
									symbolSize        : 12,
									symbolShape       : 'square',
									symbolBorderColor : 'rgba(0, 0, 0, .5)',
									effects           : [
										{
											on    : 'hover',
											style : {
												itemBackground : 'rgba(0, 0, 0, .03)',
												itemOpacity    : 1,
											},
										},
									],
								},
							]}
						/>
					) : (
						<EmptyState />
					)}
				</div>
			</div>
		</div>
	);
}

export default TransactionFunnelData;
