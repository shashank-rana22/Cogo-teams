import { ResponsivePie } from '@cogoport/charts/pie';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const BORDER_COLOR_MODIFIERS = 0.2;
const ARC_LABELS_TEXT_COLOR_MODIFIERS = 2;

const CENTERED_METRIC_FIRST_OFFSET = 3;
const CENTERED_METRIC_SECOND_OFFSET = 15;

function PieChart({ data = [], count = 0, heading = '', legendsData = [] }) {
	const colors = data.map((item) => item.color);

	function CenteredMetric({ centerX = 0, centerY = 0 }) {
		return (
			<>
				<text
					x={centerX}
					y={centerY - CENTERED_METRIC_FIRST_OFFSET}
					textAnchor="middle"
					dominantBaseline="central"
					style={{
						fontSize : '12px',
						color    : '#828282',
					}}
				>
					Predicted
				</text>

				<text
					x={centerX}
					y={centerY + CENTERED_METRIC_SECOND_OFFSET}
					textAnchor="middle"
					dominantBaseline="central"
					style={{
						fontSize   : '18px',
						fontWeight : 500,
						color      : '#221F20',
					}}
				>
					{count}
				</text>
			</>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>{heading}</div>

			<div className={styles.pie_chart_container}>
				<div className={styles.pie_chart}>
					<ResponsivePie
						colors={colors}
						data={data}
						innerRadius={0.8}
						padAngle={0.7}
						cornerRadius={3}
						activeOuterRadiusOffset={8}
						margin={{
							top    : 20,
							right  : 20,
							bottom : 20,
							left   : 20,
						}}
						borderWidth={1}
						borderColor={{
							from      : 'color',
							modifiers : [['darker', BORDER_COLOR_MODIFIERS]],
						}}
						enableArcLinkLabels={false}
						arcLinkLabelsSkipAngle={10}
						enableArcLabels={false}
						arcLinkLabelsThickness={2}
						arcLinkLabelsColor={{ from: 'color' }}
						arcLabelsSkipAngle={10}
						arcLabelsTextColor={{
							from      : 'color',
							modifiers : [['darker', ARC_LABELS_TEXT_COLOR_MODIFIERS]],
						}}
						layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
						tooltip={({ datum: { label, value } }) => (
							<div className={styles.pie_tooltip_container}>
								<div className={styles.text_pie}>
									{startCase(label)}
									{' '}
									(
									{value}
									{' '}
									TEU)
								</div>
							</div>
						)}
					/>
				</div>

				<div className={styles.legends_container}>
					{legendsData.map((legend) => {
						const { color, label, currCount } = legend;
						return (
							<div key={label} className={styles.legend_container}>
								<div className={styles.circle} style={{ background: `${color}` }} />
								{label}
								{' '}
								(
								{currCount}
								{' '}
								TEU)
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default PieChart;
