import { ResponsiveLine } from '@cogoport/charts/line';

import styles from './styles.module.css';

function RankingAndScoring(props) {
	const { data } = props;

	return (
		<div className={styles.container}>
			<div className={styles.ranking_container}>
				<h4 className={styles.heading}>Ranking</h4>

				<div className={styles.empty_text}>
					No ranking exists for Cogo India.
					Click on a User/Team from the leaderboard to view Scoring Analytics
				</div>
			</div>

			<div className={styles.scoring_container}>
				<h4 className={styles.heading}>Scoring</h4>

				<ResponsiveLine
					data={data}
					colors="#7278ad"
					lineWidth={2}
					xScale={{ type: 'point' }}
					yScale={{
						type    : 'linear',
						min     : 0,
						max     : 'auto',
						stacked : true,
						reverse : false,
					}}
					margin={{
						top    : 40,
						right  : 10,
						bottom : 80,
						left   : 80,
					}}
					axisBottom={{
						tickSize       : 5,
						tickPadding    : 5,
						tickRotation   : -45,
						legend         : 'ACCUMULATION PERIOD',
						legendOffset   : 70,
						legendPosition : 'middle',
					}}
					axisLeft={{
						tickSize       : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legend         : 'SCORES',
						legendOffset   : -70,
						legendPosition : 'middle',
					}}
					axisTop={null}
					axisRight={null}
					enableGridX
					enableGridY={false}
					isInteractive={false}
					legends={[]}
					animate
					enableArea
					enablePoints
				/>

			</div>
		</div>
	);
}

export default RankingAndScoring;
