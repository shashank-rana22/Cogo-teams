import { ResponsiveLine } from '@cogoport/charts/line';

import { data } from '../../../../../configurations/dummyData';

import styles from './styles.module.css';

function BusinessRewardStats() {
	return (
		<div className={styles.graph_div}>
			<ResponsiveLine
				data={data}
				margin={{ top: 30, right: 25, bottom: 40, left: 48 }}
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
					// legend         : 'count',
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
	);
}

export default BusinessRewardStats;
