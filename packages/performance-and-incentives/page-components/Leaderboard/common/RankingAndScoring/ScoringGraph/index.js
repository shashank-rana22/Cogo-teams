import { ResponsiveLine } from '@cogoport/charts/line';

import getFormattedGraphData from './get-formatted-graph-data';
import styles from './styles.module.css';

function ScoringGraph(props) {
	const { scoringGraphData } = props;

	const graphData = getFormattedGraphData(scoringGraphData);

	return (
		<div className={styles.scoring_container}>
			<h3 className={styles.heading}>Scoring</h3>

			<div className={styles.graph_container}>
				<ResponsiveLine
					data={graphData}
					colors="#7278ad"
					lineWidth={2}
					curve="catmullRom"
					xScale={{ type: 'point' }}
					yScale={{
						type    : 'linear',
						min     : 0,
						max     : 'auto',
						stacked : true,
						reverse : false,
					}}
					margin={{
						top    : 20,
						right  : 25,
						bottom : 60,
						left   : 50,
					}}
					axisBottom={{
						tickSize       : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legend         : 'ACCUMULATION PERIOD',
						legendOffset   : 50,
						legendPosition : 'middle',
					}}
					axisLeft={{
						tickSize       : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legend         : 'SCORES',
						legendOffset   : -40,
						legendPosition : 'middle',
					}}
					axisTop={null}
					axisRight={null}
					enableGridX={false}
					isInteractive
					useMesh
					legends={[]}
					animate
					enablePoints={false}
					enableArea
				/>
			</div>
		</div>
	);
}

export default ScoringGraph;
