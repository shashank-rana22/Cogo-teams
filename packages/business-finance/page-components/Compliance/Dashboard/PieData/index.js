import { ResponsivePie } from '@cogoport/charts/pie';
import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function PieData({ data, COLORS, filedCount, LoadingGstr1 }) {
	function CenteredMetric({ centerX, centerY }) {
		return (
			<text
				x={centerX}
				y={centerY}
				textAnchor="middle"
				dominantBaseline="central"
				style={{
					fontSize   : '24px',
					fontWeight : 600,
				}}
			>
				{filedCount}
			</text>

		);
	}

	return (
		LoadingGstr1 ? <Placeholder type="circle" radius="100px" margin="20px 0px 20px 0px" />
			: (
				<div className={styles.pie_chart}>
					<ResponsivePie
						data={data}
						margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
						innerRadius={0.7}
						colors={COLORS}
						padAngle={1}
						enableArcLabels={false}
						enableArcLinkLabels={false}
						isInteractive
						activeOuterRadiusOffset={4}
						layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
					/>
				</div>
			)

	);
}
export default PieData;
