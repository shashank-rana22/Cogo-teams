import { cl } from '@cogoport/components';
import FunnelGraph from 'funnel-graph-js';
import React, { useRef, useEffect, useMemo } from 'react';

import { LoadingState } from '../../../common/Elements';
import { Growth } from '../../../common/Elements/PercentageChange';
import useSmeDashboardStats from '../../../hooks/useSmeDashboardStats';
import getFormattedAmount from '../../../utils/getFormattedAmount';

import dataFormatter from './dataFormatter';
import styles from './styles.module.css';

function CustomerFunnel({
	widgetBlocks = null,
	filterParams = {},
}) {
	const funnelGraphContainer = useRef();

	const funnelGraphRef = useRef();

	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({
		widgetBlocks,
		filterParams,
		trendRequired: true,
	});

	const { customer_funnel_data = {} } = dashboardData || {};

	const {
		current_data = null,
		previous_data = null,
	} = customer_funnel_data || {};

	const dataFormat = dataFormatter({
		currentData  : current_data,
		previousData : previous_data,
	});

	const data = useMemo(
		() => ({
			labels    : dataFormat.map((itm) => itm?.label),
			subLabels : ['shadow-top', 'graph-data', 'shadow-bottom'],
			colors    : [
				['#e6f7a1', '#f3f5eb', '#b0eef5'],
				['#9CBC59', '#9EBE59', '#9DBD57', '#A3C45D', '#A3C35C', '#BEE076',
					'#BDDF75', '#8FDFE8', '#91E0E5', ' #8FE1EA'],
				['#e6f7a1', '#f3f5eb', '#b0eef5'],
			],
			values: dataFormat?.map((itm) => ([50, itm?.value, 50])),
		}),
		[dataFormat],
	);

	useEffect(() => {
		if (!dashboardLoading) {
			funnelGraphRef.current = new FunnelGraph({
				container         : '.funnel_graph',
				direction         : 'horizontal',
				gradientDirection : 'horizontal',
				displayPercent    : false,
				data,
				width             : funnelGraphContainer.current.clientWidth - 40,
				height            : 450,
			});

			funnelGraphRef.current.draw();
		}
	}, [dashboardLoading, data]);

	if (dashboardLoading) {
		return (
			<div
				className={cl`${styles.graph_container} ${styles.loading_graph_container}`}
			>
				<LoadingState />
			</div>
		);
	}

	return (
		<div
			className={styles.graph_container}
			ref={funnelGraphContainer}
		>
			<div className="funnel_graph" />
			<div className={styles.graph_labels}>
				{dataFormat.map(
					(itm, index) => (
						<div
							key={itm?.valueKey}
							className={styles.graph_labels_item}
							onMouseEnter={() => {
								funnelGraphRef.current.updateData(
									{
										...data,
										values: data.values.map(
											(curEle, ind) => {
												if (ind !== index) {
													return curEle;
												}
												return [10000, curEle[1], 10000];
											},
										),
									},
								);
							}}
							onMouseLeave={() => {
								funnelGraphRef.current.updateData(data);
							}}
						>
							<div>
								{itm?.label || ''}
							</div>
							<div className={styles.graph_values}>
								{getFormattedAmount({
									number: itm?.value,
								})}
								<Growth
									showGrowth={itm?.change > 0}
								/>
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
}

export default CustomerFunnel;
