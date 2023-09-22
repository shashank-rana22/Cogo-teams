import { ResponsiveLine } from '@cogoport/charts/line';

import styles from './styles.module.css';

const data = [
	{
		id   : 'rank',
		data : [
			{
				x : '1-Sept',
				y : 1,
			},
			{
				x : '3-Sept',
				y : 2,
			},
			{
				x : '5-Sept',
				y : 5,
			},
			{
				x : '7-Sept',
				y : 3,
			},
			{
				x : '9-Sept',
				y : 6,
			},
			{
				x : '11-Sept',
				y : 7,
			},
			{
				x : '13-Sept',
				y : 1,
			},
			{
				x : '15-Sept',
				y : 9,
			},
			{
				x : '17-Sept',
				y : 2,
			},
			{
				x : '19-Sept',
				y : 4,
			},
		],
	},
];

function RankingAndScoring() {
	return (
		<div className={styles.container}>
			<div className={styles.ranking_container}>
				<h3 className={styles.heading}>Ranking</h3>

				<div className={styles.empty_text}>
					No ranking exists for Cogo India.
					Click on a User/Team from the leaderboard to view Scoring Analytics
				</div>
			</div>

			<div className={styles.scoring_container}>
				<h3 className={styles.heading}>Scoring</h3>

				<div className={styles.graph_container}>
					<ResponsiveLine
						data={data}
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
							right  : 10,
							bottom : 60,
							left   : 50,
						}}
						axisBottom={{
							tickSize       : 5,
							tickPadding    : 5,
							tickRotation   : -45,
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
					/>
				</div>
			</div>
		</div>
	);
}

export default RankingAndScoring;
