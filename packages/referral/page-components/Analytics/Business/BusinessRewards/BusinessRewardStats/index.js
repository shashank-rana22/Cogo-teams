import { ResponsiveLine } from '@cogoport/charts/line';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

const INDEX_MIN_VALUE = 0;

const renderSliceTooltip = ({ slice }) => {
	const { data } = slice?.points?.[INDEX_MIN_VALUE] || {};
	return (
		<div className={styles.tooltip_div}>
			<div className={styles.title}>
				Date:
				<div className={styles.amount}>{data?.x}</div>
			</div>
			<div className={styles.title}>
				Cogopoints:
				<div className={styles.amount}>{data?.y}</div>
			</div>
		</div>
	);
};

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
					sliceTooltip={renderSliceTooltip}
				/>
			)}
		</div>
	);
}

export default BusinessRewardStats;
