import { ResponsivePie } from '@cogoport/charts/pie';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Loader from '../../common/Loader';

import BlDoData from './BlDoData';
import getFormatedData from './getFormatedData';
import styles from './styles.module.css';

function PieChart({ activeTab = '', chartData = {}, loading = false }) {
	const { stats } = chartData;
	const { CONTAINER_MOVEMENT_MAPPING, TAB_DATA, COLORS } = getFormatedData(stats);
	const { container_movement_count = '', bl_do_release_count = '', both_count = '' } = stats || {};
	const tabCounts = {
		container_movement : container_movement_count,
		bl_do              : bl_do_release_count,
		both               : both_count,
	};
	const centroidValue = tabCounts[activeTab] || '';
	const data = TAB_DATA[activeTab] || [];

	function CenteredMetric({ centerX = 0, centerY = 0 }) {
		return (
			<text
				x={centerX}
				y={centerY}
				textAnchor="middle"
				dominantBaseline="central"
				style={{
					fontSize   : '12px',
					fontWeight : 600,
				}}
			>
				{centroidValue}
			</text>
		);
	}

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.pie_chart}>
					{loading ? (
						<img
							src={GLOBAL_CONSTANTS.image_url.pie_chart_loader}
							alt="badge-icon"
						/>
					)
						: (
							<ResponsivePie
								data={data}
								margin={{ top: 8, right: 0, bottom: 4, left: 10 }}
								innerRadius={0.7}
								colors={COLORS}
								padAngle={1}
								enableArcLabels={false}
								enableArcLinkLabels={false}
								isInteractive
								activeOuterRadiusOffset={4}
								layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
							/>
						)}
				</div>

				<div className={styles.bottom_heading}>
					{activeTab === 'container_movement' && 'Container Movement'}
					{activeTab === 'bl_do' && 'BL/DO Release'}
				</div>
			</div>

			{activeTab === 'container_movement' && (loading ? <Loader />
				: (
					<div className={styles.column_container}>
						{CONTAINER_MOVEMENT_MAPPING.map((item) => (
							<div className={styles.sub_container} key={item.label}>
								<div className={styles.square} style={{ background: item.color }} />
								<div className={styles.label}>
									{item.label}
								</div>
								<div className={styles.value}>
									{ isEmpty(item.value) ? '-' : item.value}
								</div>
							</div>
						))}
					</div>
				)
			)}
			{activeTab === 'bl_do' && (
				loading ? <Loader />
					:				(<BlDoData stats={stats} />)
			)}
			<div className={styles.side_container} />
		</div>
	);
}
export default PieChart;
