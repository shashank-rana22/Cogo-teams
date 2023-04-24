import { ResponsiveBar } from '@cogoport/charts/bar';
import { Placeholder } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function index(props) {
	const { graphData, graphLoading } = props;

	const data = [
		{
			warmth: 'icy_cold', count: 0,
		},
		{
			warmth: 'cold', count: 0,
		},
		{
			warmth: 'warm', count: 0,
		},
		{
			warmth: 'hot', count: 0,
		},
		{
			warmth: 'flaming_hot', count: 0,
		},
	];

	graphData.forEach((element) => {
		data.forEach((item) => {
			if (element.warmth === item.warmth) {
				// eslint-disable-next-line no-param-reassign
				item.count = element.count;
			}
		});
	});

	data.forEach((item) => {
		// eslint-disable-next-line no-param-reassign
		item.warmth = startCase(item.warmth);
	});

	if (graphLoading) {
		return (
			<div className={styles.loading}>
				<Placeholder height="300px" width="100%" margin="0px 0px 20px 0px">
					<svg width="50%" height="50%" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M68.1727 38.5588H37.4414V7.82751C37.4414 7.44939 37.132 7.14001
				36.7539 7.14001H34.5195C30.0102
				7.13541 25.5444 8.02124 21.3783 9.74667C17.2122 11.4721 13.4278 14.0032
			10.2422 17.1947C7.10575 20.3214 4.6073 24.0283 2.88594 28.1088C1.09844
			32.3455 0.1875 36.84 0.1875
			41.4806C0.1875 46.1213 1.09844 50.6072 2.88594 54.8439C4.61328 58.926 7.08828 62.6041
			10.2422 65.758C13.3961 68.9119 17.0656 71.3869 21.1562 73.1142C25.3856
			74.9085 29.934 75.8293 34.5281
			75.8213C39.0374 75.8259 43.5032 74.94 47.6693 73.2146C51.8355 71.4892
			55.6199 68.9581 58.8055
			65.7666C61.9594 62.6127 64.4344 58.9431 66.1617 54.8525C67.956 50.6232
			68.8768 46.0748 68.8688
			41.4806V39.2463C68.8602 38.8681 68.5508 38.5588 68.1727 38.5588ZM75.7266
			33.7892L75.5031 31.3658C74.7727
			23.4595 71.2664 16.0002
			65.6117 10.3713C59.9623 4.72658 52.5177 1.2338 44.5656 0.497044L42.1336

			0.273606C41.7297 0.239231
			41.3859 0.548606 41.3859 0.952513V33.9267C41.3859 34.3049 41.6953 34.6142
			42.0734 34.6142L75.0391
			34.5283C75.443 34.5197 75.7609 34.1845 75.7266 33.7892Z"
							fill="#BDBDBD"
						/>
					</svg>
				</Placeholder>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<ResponsiveBar
				data={data}
				keys={['count']}
				indexBy="warmth"
				margin={{ top: 90, right: 60, bottom: 90, left: 150 }}
				padding={0.5}
				valueScale={{
					type: 'linear',
				}}
				colors={['#888FD1']}
				axisBottom={{
					tickSize       : 0,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : 'Warmth',
					legendPosition : 'middle',
					legendOffset   : 60,
				}}
				axisLeft={{
					tickSize       : 0,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : 'Accounts',
					legendPosition : 'middle',
					legendOffset   : -80,
				}}
				enableGridY
				enableLabel={false}
			/>
		</div>
	);
}

export default index;
