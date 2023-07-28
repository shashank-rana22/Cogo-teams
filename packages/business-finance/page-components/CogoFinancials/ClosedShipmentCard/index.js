import { ResponsiveRadialBar } from '@cogoport/charts/radial-bar';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const LABEL_MAPPING = {
	Financially   : 'Actual',
	Operationally : 'Operational',
};

function ClosedShipmentCard({
	isDeviationVisible = true, type = 'Financially',
	cardId = '', setActiveShipmentCard = () => {},
	isAdditonalView = false,
}) {
	const data = [
		{
			id   : 'Cost',
			data : [
				{
					x : 'Estimated Cost',
					y : 80,
				},
				{
					x : `${LABEL_MAPPING[type]} Cost`,
					y : 20,
				},
			],
		},
		{
			id   : 'Revenue',
			data : [
				{
					x : 'Estimated Revenue',
					y : 60,
				},
				{
					x : `${LABEL_MAPPING[type]} Revenue`,
					y : 40,
				},
			],
		},

	];

	const graphData = [
		{
			rowId    : 'first_row',
			children : [
				{ label: 'Estimated Revenue', value: 'Curr XXXXX', color: '#cfeaed' },
				{ label: 'Estimated Cost', value: 'Curr XXXXX', color: '#f8aea8' },
			],
		},
		{
			rowId    : 'second_row',
			children : [
				{ label: `${LABEL_MAPPING[type]} Revenue`, value: 'Curr XXXXX', color: '#6fa5ab' },
				{ label: `${LABEL_MAPPING[type]} Cost`, value: 'Curr XXXXX', color: '#ee3425' },
			],
		},

	];

	const updateGraphData = isDeviationVisible
		? [...graphData,
			{
				rowId    : 'third_row',
				children : [
					{ label: 'Deviation', value: 'Curr XXXXX', color: 'null' },
					{ label: 'Deviation', value: 'Curr XXXXX', color: 'null' },
				],
			},
		]
		: graphData;

	return (
		<div className={styles.financially_closed_container}>
			<div className={styles.financial_header}>
				<div>
					{`${type} `}
					Closed Shipments
				</div>
				<div className={styles.info}><IcMInfo /></div>
			</div>
			<div className={styles.bottom_line} />

			<div
				className={styles.chart_data_combine}
				role="presentation"
				onClick={() => setActiveShipmentCard(cardId)}
			>
				<div
					className={styles.responsive_graph_circular}
					style={{ height: isAdditonalView ? '200px' : null }}
				>
					<ResponsiveRadialBar
						data={data}
						valueFormat=">-.2f"
						padding={0}
						cornerRadius={2}
						radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
						circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
						endAngle="360"
						innerRadius={0.6}
						enableRadialGrid={false}
						enableCircularGrid={false}
						layers={['tracks', 'bars']}
						colors={['#f8aea8', '#ee3425', '#cfeaed', '#6fa5ab']}
					/>

				</div>
				<div className={styles.show_graph_data}>
					{updateGraphData.map((item) => (
						<div
							key={item?.id}
							className={styles.graph_row}
						>
							{(item.children || []).map((child) => (
								<div key={child.label}>
									<div className={styles.graph_label}>
										<span
											className={styles.label_circle}
											style={{ backgroundColor: child.color }}
										/>
										{child.label}
									</div>
									<div className={styles.graph_value}>
										{child.value}
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ClosedShipmentCard;
