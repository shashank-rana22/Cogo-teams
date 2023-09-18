import { ResponsivePie } from '@cogoport/charts/pie';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../commons/EmptyState';
import useGetStatsData from '../../hooks/useGetStatsData';

import styles from './styles.module.css';

const TRANSFORM_Y = 42;

function Statistics({
	head = 'contact',
	params = {},
}) {
	const { title, count, loading, sample_contact_data } = useGetStatsData({ stats_type: head, params });

	const colors = sample_contact_data?.map((item) => item.color);

	function CustomLegend() {
		return (
			<g transform="translate(435.328125,-1)">
				{(sample_contact_data)?.map((item, ind) => (
					<g
						key={item.id}
						transform={`translate(0,${TRANSFORM_Y * ind})`}
					>
						<rect
							width="190"
							height="40"
							fill="#fff"
							rx="4"
						/>
						<rect x="4" y="33" width="182" height="1" fill="#F2E3C3" strokeWidth="3" />
						<rect
							x="8"
							y="6.5"
							fill={item.color}
							opacity="1"
							strokeWidth="0"
							stroke="transparent"
							width="20"
							height="20"
							rx="2"
							style={{ pointerEvents: 'none' }}
						/>
						<text
							textAnchor="start"
							x="34"
							y="16.5"
							style={{
								fontFamily       : 'sans-serif',
								fontSize         : '11px',
								fill             : 'rgb(0,0,0)',
								dominantBaseline : 'central',
								pointerEvents    : 'none',
								userSelect       : 'none',
							}}
						>
							{item?.label}

						</text>
						<text
							textAnchor="end"
							x="180"
							y="16.5"
							style={{
								fontFamily       : 'sans-serif',
								fontSize         : '11px',
								fill             : 'rgb(0,0,0)',
								dominantBaseline : 'central',
								pointerEvents    : 'none',
								userSelect       : 'none',
							}}
						>
							{item.percentage}
							%
						</text>
					</g>
				))}
			</g>
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.chart_title}>
				<div>
					{title}
				</div>
				<span className={styles.chartCount}>
					{count}
				</span>
			</div>
			{
				!loading && isEmpty(sample_contact_data)
					? <EmptyState showImage={false} height={100} width={150} />
					: (
						<div className={styles.single_chart_container}>
							<ResponsivePie
								className={styles.container_pie}
								data={sample_contact_data}
								margin={{ top: 20, bottom: 20, left: -220 }}
								startAngle={-180}
								sortByValue
								innerRadius={0.68}
								activeInnerRadiusOffset={6}
								activeOuterRadiusOffset={6}
								colors={colors}
								borderColor={{ from: 'color', modifiers: [['darker', '0']] }}
								enableArcLinkLabels={false}
								arcLinkLabelsSkipAngle={10}
								arcLinkLabelsTextColor="#333333"
								arcLinkLabelsThickness={2}
								arcLinkLabelsColor={{ from: 'color' }}
								enableArcLabels={false}
								arcLabelsSkipAngle={10}
								layers={[CustomLegend, 'arcs', 'arcLabels', 'arcLinkLabels']}
								transitionMode="endAngle"
							/>
						</div>
					)
}
		</div>
	);
}
export default Statistics;
