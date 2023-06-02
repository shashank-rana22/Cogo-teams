import { ResponsiveLine } from '@cogoport/charts/line';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function BusinessRewardStats({ graphData = [], loading = false }) {
	return (
		<div className={styles.graph_div}>
			{loading ? (
				<Image
					src={GLOBAL_CONSTANTS.image_url.spinner_loader}
					width={50}
					height={50}
				/>
			) : (

				<ResponsiveLine
					data={graphData}
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
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize     : 5,
						tickPadding  : 5,
						tickRotation : 0,
					}}
					axisLeft={{
						tickSize     : 5,
						tickPadding  : 5,
						tickRotation : 0,
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
			)}
		</div>
	);
}

export default BusinessRewardStats;
