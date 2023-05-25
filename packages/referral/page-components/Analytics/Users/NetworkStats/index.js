import { ResponsiveLine } from '@cogoport/charts/line';

import { data } from '../../../../configurations/dummyData';

import styles from './styles.module.css';

function NetworkStats() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Network</div>
			<div className={styles.graph_div}>
				<ResponsiveLine
					data={data}
					margin={{ top: 12, right: 20, bottom: 55, left: 50 }}
					xScale={{ type: 'point' }}
					yScale={{
						type    : 'linear',
						min     : 'auto',
						max     : 'auto',
						stacked : true,
						reverse : false,
					}}
					yFormat=" >-.2f"
					curve="cardinal"
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize       : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						// legend         : 'transportation',
						legendOffset   : 36,
						legendPosition : 'middle',
					}}
					axisLeft={{
						tickSize       : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legend         : 'count',
						legendOffset   : -40,
						legendPosition : 'middle',
					}}
					enableGridX={false}
					enablePoints={false}
					pointSize={10}
					pointColor={{ theme: 'background' }}
					pointBorderWidth={2}
					pointBorderColor={{ from: 'serieColor' }}
					pointLabelYOffset={-12}
					useMesh
					legends={[]}
				/>

			</div>
		</div>
	);
}

export default NetworkStats;
