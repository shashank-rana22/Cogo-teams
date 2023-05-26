import { ResponsiveHeatMap } from '@cogoport/charts/heatmap';
import { cl } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';

import styles from './styles.module.css';

function MyResponsiveScatterPlot({ setSingleData = () => {}, simulationData = {} }) {
	console.log('simulationData:', simulationData);
	// const mapData = () => {
	// 	let details = [];
	// 	const graphData = [];
	// 	let levelsData = [];

	// 	for (let i = 1; i <= 20; i += 1) {
	// 		levelsData = [
	// 			...levelsData,
	// 			{
	// 				levels  : i,
	// 				payouts : 1000,
	// 			},
	// 		];

	// 		// for (let j = 1; j <= 20; j += 1) {
	// 		// 	graphData = [
	// 		// 		...graphData,
	// 		// 		{
	// 		// 			x : 10000 * j,
	// 		// 			y : 10000,
	// 		// 			levelsData,
	// 		// 		},

	// 		// 	];
	// 		// }

	// 		details = [
	// 			...details,
	// 			{
	// 				id   : i,
	// 				data : graphData,
	// 			},
	// 		];
	// 	}
	// 	return details;
	// };

	// const data = mapData();

	const hello = [
		{
			id   : 1,
			data : [
				{
					x : '10k',
					y : 10000,

				},
				{
					x : '20k',
					y : 15000,

				},
				{
					x : '30k',
					y : 15000,
				},
				{
					x : '40k',
					y : 1500,
				},
				{
					x : '50k',
					y : 1000,
				},
				{
					x : '60k',
					y : 15000,
				},
				{
					x : '70k',
					y : 9000,
				},
				{
					x : '80k',
					y : 1500,
				},
				{
					x : '90k',
					y : 15000,
				},
				{
					x : '100k',
					y : 15000,
				},
			],
		},
		{
			id   : 2,
			data : [
				{
					x : '10k',
					y : 1000,
				},
				{
					x : '20k',
					y : 15000,
				},
				{
					x : '30k',
					y : 1500,
				},
				{
					x : '40k',
					y : 1500,
				},
			],
		},
	];

	const mapData = (data) => {
		const details = [];
		Object.entries(data).forEach(([key, value], index) => {
			console.log(`Index: ${index}, Key: ${key}, Value: ${value}`);
		});

		return details;
	};

	const finalData = mapData(simulationData);

	return (
		<div className={styles.container}>
			<ResponsiveHeatMap
				data={hello}
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
				onClick={(item) => setSingleData({ item })}
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
