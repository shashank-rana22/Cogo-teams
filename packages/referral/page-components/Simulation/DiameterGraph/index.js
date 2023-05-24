// import { ResponsiveScatterPlot } from '@cogoport/charts/scatterplot';
// import { IcMArrowNext } from '@cogoport/icons-react';

// import styles from './styles.module.css';

// function MyResponsiveScatterPlot() {
// 	const data = [
// 		{
// 			id   : 'group A',
// 			data : [
// 				{
// 					x : 38,
// 					y : 10,
// 				},
// 				{
// 					x : 42,
// 					y : 20,
// 				},
// 				{
// 					x : 35,
// 					y : 58,
// 				},
// 				{
// 					x : 36,
// 					y : 10,
// 				},
// 				{
// 					x : 8,
// 					y : 54,
// 				},
// 				{
// 					x : 17,
// 					y : 85,
// 				},
// 				{
// 					x : 50,
// 					y : 54,
// 				},
// 				{
// 					x : 18,
// 					y : 110,
// 				},
// 				{
// 					x : 1,
// 					y : 91,
// 				},
// 				{
// 					x : 79,
// 					y : 80,
// 				},
// 				{
// 					x : 99,
// 					y : 11,
// 				},
// 				{
// 					x : 100,
// 					y : 6,
// 				},
// 				{
// 					x : 12,
// 					y : 11,
// 				},
// 				{
// 					x : 87,
// 					y : 5,
// 				},
// 				{
// 					x : 45,
// 					y : 81,
// 				},

// 			],
// 		},
// 	];

// 	return (
// 		<div className={styles.container}>
// 			<ResponsiveScatterPlot
// 				data={data}
// 				margin={{ top: 30, right: 20, bottom: 80, left: 70 }}
// 				enableGridX={false}
// 				axisTop={null}
// 				axisRight={null}
// 				colors={['#D9D9D9']}
// 				nodeSize={30}
// 				axisBottom={{
// 					orient         : 'bottom',
// 					tickSize       : 0,
// 					tickPadding    : 15,
// 					tickRotation   : 0,
// 					legend         : 'Shipment Revenue (INR)',
// 					legendPosition : 'start',
// 					legendOffset   : 46,
// 				}}
// 				axisLeft={{
// 					orient         : 'left',
// 					tickSize       : 0,
// 					tickPadding    : 20,
// 					tickRotation   : 0,
// 					legend         : 'Network Levels',
// 					legendPosition : 'start',
// 					legendOffset   : -60,
// 				}}
// 				legends={[]}
// 			/>
// 			<div className={styles.direction_container}>
// 				<div className={styles.right_arrow}>
// 					<IcMArrowNext />
// 				</div>
// 				<div className={styles.left_arrow}>
// 					<IcMArrowNext />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default MyResponsiveScatterPlot;

import { ResponsiveHeatMap } from '@cogoport/charts/heatmap';
import { cl } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';

import styles from './styles.module.css';

function MyResponsiveScatterPlot({
	setSingleData = () => {},
}) {
	const data = [

		{
			id   : 1,
			data : [
				{
					x : 10,
					y : 9000,
				},
				{
					x : 20,
					y : 19000,
				},
				{
					x : 30,
					y : 29000,
				},
				{
					x : 40,
					y : 9000,
				},
				{
					x : 50,
					y : 49000,
				},
				{
					x : 60,
					y : 59000,
				},
				{
					x : 70,
					y : 49000,
				},
				{
					x : 80,
					y : 59000,
				},
				{
					x : 90,
					y : 49000,
				},
				{
					x : 200,
					y : 59000,
				},
				{
					x : 210,
					y : 49000,
				},
				{
					x : 220,
					y : 59000,
				},
				{
					x : 230,
					y : 49000,
				},
				{
					x : 240,
					y : 59000,
				},
				{
					x : 250,
					y : 49000,
				},
				{
					x : 260,
					y : 59000,
				},
				{
					x : '270k',
					y : 49000,
				},
				{
					x : 280,
					y : 59000,
				},
				{
					x : 290,
					y : 49000,
				},
				{
					x : 300,
					y : 59000,
				},
				{
					x : 310,
					y : 59000,
				},
				{
					x : 320,
					y : 49000,
				},
				{
					x : 330,
					y : 59000,
				},
				{
					x : 340,
					y : 59000,
				},
				{
					x : 350,
					y : 49000,
				},
				{
					x          : 360,
					y          : 59000,
					dummyLevel : [
						{
							level   : 1,
							payouts : 100,
						},
						{
							level   : 2,
							payouts : 1000,
						},
						{
							level   : 3,
							payouts : 100,
						},
						{
							level   : 4,
							payouts : 100,
						},
						{
							level   : 15,
							payouts : 100,
						},
						{
							level   : 6,
							payouts : 130,
						},
						{
							level   : 7,
							payouts : 140,
						},
						{
							level   : 8,
							payouts : 3300,
						},
						{
							level   : 9,
							payouts : 100,
						},
						{
							level   : 1,
							payouts : 100,
						},
						{
							level   : 1,
							payouts : 100,
						},
						{
							level   : 1,
							payouts : 100,
						},
						{
							level   : 2,
							payouts : 1000,
						},
						{
							level   : 3,
							payouts : 100,
						},
						{
							level   : 4,
							payouts : 100,
						},
						{
							level   : 15,
							payouts : 100,
						},
						{
							level   : 6,
							payouts : 130,
						},
						{
							level   : 7,
							payouts : 140,
						},
						{
							level   : 8,
							payouts : 3300,
						},
						{
							level   : 9,
							payouts : 100,
						},
						{
							level   : 1,
							payouts : 100,
						},
						{
							level   : 1,
							payouts : 100,
						},

					],
				},

			],
			dummyLevel: [
				{
					level   : 1,
					payouts : 100,
				},
				{
					level   : 2,
					payouts : 1000,
				},
				{
					level   : 3,
					payouts : 100,
				},
				{
					level   : 4,
					payouts : 100,
				},
				{
					level   : 5,
					payouts : 100,
				},
				{
					level   : 6,
					payouts : 130,
				},
				{
					level   : 7,
					payouts : 140,
				},
				{
					level   : 8,
					payouts : 3300,
				},
				{
					level   : 9,
					payouts : 100,
				},
				{
					level   : 1,
					payouts : 100,
				},
				{
					level   : 1,
					payouts : 100,
				},

			],
		},
		{
			id   : 2,
			data : [
				{
					x : 10,
					y : 2000,
				},
				{
					x : 20,
					y : 9000,
				},
				{
					x : 30,
					y : 29000,
				},
				{
					x : 40,
					y : 19000,
				},
				{
					x : 50,
					y : 67000,
				},

			],
		},
		{
			id   : 3,
			data : [
				{
					x : 10,
					y : 2000,
				},
				{
					x : 20,
					y : 9000,
				},
				{
					x : 30,
					y : 29000,
				},
				{
					x : 40,
					y : 19000,
				},
				{
					x : 50,
					y : 67000,
				},

			],
		},
		{
			id   : 4,
			data : [
				{
					x : 10,
					y : 2000,
				},
				{
					x : 20,
					y : 9000,
				},
				{
					x : 30,
					y : 29000,
				},
				{
					x : 40,
					y : 19000,
				},
				{
					x : 50,
					y : 67000,
				},

			],
		},
		{
			id   : 5,
			data : [
				{
					x : 10,
					y : 2000,
				},
				{
					x : 20,
					y : 9000,
				},
				{
					x : 30,
					y : 29000,
				},
				{
					x : 40,
					y : 19000,
				},
				{
					x : 50,
					y : 67000,
				},

			],
		},
		{
			id   : 6,
			data : [
				{
					x : 10,
					y : 2000,
				},
				{
					x : 20,
					y : 9000,
				},
				{
					x : 30,
					y : 29000,
				},
				{
					x : 40,
					y : 19000,
				},
				{
					x : 50,
					y : 67000,
				},

			],
		},
		{
			id   : 7,
			data : [
				{
					x : 10,
					y : 2000,
				},
				{
					x : 20,
					y : 9000,
				},
				{
					x : 30,
					y : 29000,
				},
				{
					x : 40,
					y : 19000,
				},
				{
					x : 50,
					y : 67000,
				},

			],
		},
		{
			id   : 8,
			data : [
				{
					x          : 10,
					y          : 2000,
					dummyLevel : [
						{
							level   : 1,
							payouts : 100,
						},
						{
							level   : 2,
							payouts : 1000,
						},
						{
							level   : 3,
							payouts : 100,
						},
						{
							level   : 4,
							payouts : 100,
						},
						{
							level   : 5,
							payouts : 100,
						},
						{
							level   : 6,
							payouts : 130,
						},
						{
							level   : 7,
							payouts : 140,
						},
						{
							level   : 8,
							payouts : 3300,
						},
						{
							level   : 9,
							payouts : 100,
						},
						{
							level   : 1,
							payouts : 100,
						},
						{
							level   : 1,
							payouts : 100,
						},

					],
				},
				{
					x : 20,
					y : 9000,
				},
				{
					x : 30,
					y : 29000,
				},
				{
					x : 40,
					y : 19000,
				},
				{
					x : 80,
					y : 6000,
				},

			],
		},

	];

	return (
		<div className={styles.container}>
			<ResponsiveHeatMap
				data={data}
				margin={{ top: 30, right: 20, bottom: 80, left: 70 }}
				valueFormat=">-.2s"
				xOuterPadding={0.05}
				yOuterPadding={0.05}
				axisTop={null}
				axisBottom={{
					tickSize       : 0,
					tickPadding    : 6,
					tickRotation   : 0,
					legend         : 'Shipment Revenue (INR)',
					legendPosition : 'start',
					legendOffset   : 34,
				}}
				axisLeft={{
					tickSize       : 5,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : 'Network Levels',
					legendPosition : 'start',
					legendOffset   : -52,
				}}
				colors={{
					type      : 'diverging',
					scheme    : 'red_yellow_blue',
					divergeAt : 0.5,
					minValue  : -100000,
					maxValue  : 100000,
				}}
				activeOpacity={0.4}
				inactiveOpacity={0.8}
				onClick={((item) => setSingleData({ item }))}

			/>
			<div className={styles.direction_container}>
				<div className={cl`${styles.arrow} ${styles.right_arrow}`}>
					<IcMArrowNext />
				</div>
				<div className={cl`${styles.arrow} ${styles.left_arrow}`}>
					<IcMArrowNext />
				</div>
			</div>
		</div>
	);
}

export default MyResponsiveScatterPlot;
