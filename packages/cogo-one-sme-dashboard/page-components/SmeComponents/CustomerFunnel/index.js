import FunnelGraph from 'funnel-graph-js';
import React, { useRef, useEffect, useMemo } from 'react';

import { Growth } from '../../../common/Elements/PercentageChange';
import useSmeDashboardStats from '../../../hooks/useSmeDashboardStats';
import getFormattedAmount from '../../../utils/getFormattedAmount';

import styles from './styles.module.css';

function CustomerFunnel({ widgetBlocks = null, filterParams = {} }) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({ widgetBlocks, filterParams });

	const data = useMemo(
		() => ({
			labels: ['Website Visitors', 'Awareness Stage', 'AQL (enriched data)', 'Interest Captured', 'MQL',
				'Account Created', 'Engagement Stage(Pre KYC)', 'KYC Verified', 'Engagement Stage(Post KYC)',
				'Transaction Stage', 'Retained Customers', 'Churned Stage', 'Retired Stage'],
			subLabels : ['shadow-top', 'graph-data', 'shadow-bottom'],
			colors    : [
				['#e6f7a1', '#f3f5eb', '#b0eef5'],
				['#9CBC59', '#9EBE59', '#9DBD57', '#A3C45D', '#A3C35C', '#BEE076',
					'#BDDF75', '#8FDFE8', '#91E0E5', ' #8FE1EA'],
				['#e6f7a1', '#f3f5eb', '#b0eef5'],
			],
			values: [
				[50, 1798, 50],
				[50, 1689, 50],
				[50, 1524, 50],
				[50, 1342, 50],
				[50, 1122, 50],
				[50, 935, 50],
				[50, 735, 50],
				[50, 634, 50],
				[50, 574, 50],
				[50, 434, 50],
				[50, 220, 50],
				[50, 81, 50],
				[50, 17, 50],
			],
		}),
		[],
	);

	const funnelGraphContainer = useRef();

	const funnelGraphRef = useRef();

	useEffect(() => {
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
	}, [data]);

	return (
		<div
			className={styles.graph_container}
			ref={funnelGraphContainer}
		>
			<div className="funnel_graph" />
			<div className={styles.graph_labels}>
				{data.labels.map(
					(itm, index) => (
						<div
							key={itm}
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
												return [100, curEle[1] + 100, 100];
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
								{itm}
							</div>
							<div className={styles.graph_values}>
								{getFormattedAmount({
									number: data.values[index][1],
								})}
								<Growth
									showGrowth={!!(Math.floor(Math.random() * 10) % 2)}
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
