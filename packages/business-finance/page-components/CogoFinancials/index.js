import { ResponsiveRadialBar } from '@cogoport/charts/radial-bar';
import { Select, Toggle } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo/index';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import SegmentedControl from '../commons/SegmentedControl/index.tsx';

import MultipleFilters from './MultipleFilters';
import ReceivablesOutstandings from './ReceivablesOutstandings';
import styles from './styles.module.css';

const TIME_RANGE_OPTIONS = [
	{ label: '1D', value: '1D' },
	{ label: '1W', value: '1W' },
	{ label: '1M', value: '1M' },
	{ label: '6M', value: '6M' },
	{ label: '1Y', value: '1Y' },
];

const geo = getGeoConstants();
const countryCode = geo?.country.code;
const DEFAULT_ENTITY_DATA = Object.values(GLOBAL_CONSTANTS.cogoport_entities)?.filter(
	(item) => item.country_code === countryCode,
);
const DEFAULT_ENTITY = DEFAULT_ENTITY_DATA[GLOBAL_CONSTANTS.zeroth_index]?.default_entity_code;

const ENTITY_OPTIONS = Object.keys(GLOBAL_CONSTANTS.cogoport_entities)?.map((item) => ({
	value : String(item),
	label : `${item} - ${GLOBAL_CONSTANTS.cogoport_entities[item].name}`,
}));

const data = [
	{
		id   : 'Cost',
		data : [
			{
				x : 'Estimated Cost',
				y : 80,
			},
			{
				x : 'Actual Cost',
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
				x : 'Actual Revenue',
				y : 40,
			},
		],
	},

];

function CogoFinancials() {
	const [isPreTax, setIsPreTax] = useState(true);
	const [timeRange, setTimeRange] = useState('1D');
	const [entity, setEntity] = useState(DEFAULT_ENTITY);

	const graphData = [
		{
			rowId    : 'first_row',
			children : [
				{ label: 'Estimated Revenue', value: 'Curr XXXXX', color: 'red' },
				{ label: 'Estimated Cost', value: 'Curr XXXXX', color: 'red' },
			],
		},
		{
			rowId    : 'second_row',
			children : [
				{ label: 'Actual Revenue', value: 'Curr XXXXX', color: 'red' },
				{ label: 'Actual Cost', value: 'Curr XXXXX', color: 'red' },
			],
		},
		{
			rowId    : 'third_row',
			children : [
				{ label: 'Deviation', value: 'Curr XXXXX', color: 'red' },
				{ label: 'Deviation', value: 'Curr XXXXX', color: 'red' },
			],
		},
	];

	return (
		<div>
			<div className={styles.header}>
				<div><h2>COGO Financials</h2></div>
				<div style={{ display: 'flex' }}>
					<Toggle
						name="taxType"
						size="md"
						offLabel="Pre Tax"
						onLabel="Post Tax"
						onChange={() => setIsPreTax(!isPreTax)}
					/>
					<div style={{ margin: '0px 12px' }}>
						<SegmentedControl
							options={TIME_RANGE_OPTIONS}
							activeTab={timeRange}
							setActiveTab={setTimeRange}
							color="#ED3726"
							background="#FFFAEB"
						/>
					</div>
					<MultipleFilters />
					<Select
						value={entity}
						onChange={setEntity}
						options={ENTITY_OPTIONS}
						style={{ width: '320px' }}
					/>
				</div>

			</div>
			<div className={styles.financially_closed_container}>
				<div className={styles.financial_header}>
					<div>Financially Closed Shipments</div>
					<div className={styles.info}><IcMInfo /></div>
				</div>
				<hr className={styles.bottom_line} />

				<div style={{ margin: '20px', display: 'flex', alignItems: 'center' }}>
					<div
						className={styles.responsive_graph_circular}
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
							colors={['#ee3425', '#f8aea8', '#6fa5ab', '#cfeaed']}
						/>

					</div>
					<div className={styles.show_graph_data}>
						{graphData.map((item) => (

							<div
								key={item?.id}
								style={{
									display        : 'flex',
									justifyContent : 'space-between',
									margin         : '20px 0px',
									width          : '100%',
								}}
							>
								{(item.children || []).map((child) => (
									<div key={child.label}>
										<div className={styles.graph_label}>
											<span className={styles.label_circle} />
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
			<ReceivablesOutstandings />
		</div>
	);
}

export default CogoFinancials;
