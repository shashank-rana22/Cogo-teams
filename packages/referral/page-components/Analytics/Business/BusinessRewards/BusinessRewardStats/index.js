import { ResponsiveLine } from '@cogoport/charts/line';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

const styledToolTip = ({ slice }) => (
	<div className={styles.tooltip_div}>
		<div className={styles.title}>
			Date:
			<div className={styles.amount}>{slice?.points?.[0]?.data.x}</div>
		</div>
		<div className={styles.title}>
			Cogopoints:
			<div className={styles.amount}>{slice?.points?.[0]?.data.y}</div>
		</div>
	</div>
);

function BusinessRewardStats({ graphData = [], loading = false }) {
	return (
		<div className={styles.graph_div}>
			{loading ? (
				<Image
					src={GLOBAL_CONSTANTS.image_url.spinner_loader}
					width={50}
					height={50}
					alt="loader"
				/>
			) : (
				<ResponsiveLine
					data={graphData}
					margin={{ top: 30, right: 45, bottom: 40, left: 52 }}
					xScale={{ type: 'point' }}
					yScale={{
						type    : 'linear',
						min     : 'auto',
						max     : 'auto',
						stacked : true,
						reverse : false,
					}}
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
					enableSlices="x"
					sliceTooltip={styledToolTip}
				/>
			)}
		</div>
	);
}

export default BusinessRewardStats;
