import { ResponsivePie } from '@cogoport/charts/pie';
import { Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Loader from '../../common/Loader';

import getFormatedData from './getFormatedData';
import styles from './styles.module.css';

function PieChart({ activeTab, chartData, loading }) {
	const { stats } = chartData || {};
	const {
		CONTAINER_MOVEMENT_MAPPING, LATE_COLLECTION_MAPPING,
		tabData, colors,
	} = getFormatedData(stats);
	const {
		container_movement_count = '',
		bl_do_release_count = '', both_count = '', late_collection_stats, late_release_stats,
	} = stats || {};
	const { late_collection_total = '' } = late_collection_stats || {};

	const { late_release_total = '', payment_not_received = '' } = late_release_stats || {};

	const tabCounts = {
		container_movement : container_movement_count,
		bl_do              : bl_do_release_count,
		both               : both_count,
	};
	const centroidValue = tabCounts[activeTab] || '';

	const data = tabData[activeTab] || [];

	function CenteredMetric({ centerX, centerY }) {
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
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-spinner.svg"
							alt="badge-icon"
						/>
					)
						: (
							<ResponsivePie
								data={data}
								margin={{ top: 8, right: 0, bottom: 4, left: 10 }}
								innerRadius={0.7}
								colors={colors}
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
					{/* {activeTab === 'both' && 'Charge Range'} */}
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
					:				(
						<div className={styles.bl_do_container}>
							<div>
								<div className={styles.bl_square1} />
								<div className={styles.sub_container}>

									<div className={styles.label}>
										Late collection :
									</div>
									<div className={styles.value}>
										{late_collection_total || '-'}
									</div>
								</div>
								{LATE_COLLECTION_MAPPING.map((item) => (
									<div className={styles.sub_container} key={item.value}>
										<div className={styles.point} />
										<div>
											{item.label}
											{' '}
											{ item.value || '-'}
										</div>
									</div>
								))}
							</div>
							<div className={styles.bl_do_container}>
								<div>
									<div className={styles.bl_square5} />
									<div className={styles.sub_container}>
										<div className={styles.label}>
											Late Release :
										</div>
										<div className={styles.value}>
											{late_release_total || '-'}
										</div>
									</div>

									<div className={styles.sub_container}>
										<div className={styles.point} />
										<div>
											Customer - Payment Not Received :
											{'  '}
											{ payment_not_received || '-'}
										</div>
									</div>

								</div>
							</div>
						</div>
					)
			)}

			<div className={styles.side_container}>
				<div className={styles.top_element}>
					<IcMInfo height={20} width={20} />
				</div>
				{activeTab !== 'both'
					&& (
						<div className={styles.bottom_element}>
							<Button size="md" themeType="linkUi">
								<div className={styles.button_text}>
									View By Charge
								</div>
							</Button>
						</div>
					)}
			</div>
		</div>
	);
}

export default PieChart;
