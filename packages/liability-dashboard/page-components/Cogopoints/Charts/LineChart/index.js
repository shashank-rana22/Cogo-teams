import { ResponsiveLine } from '@cogoport/charts/line';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function LineChart({ formattedData = [], transactionType = '', currencyCode = '' }) {
	console.log('🚀 ~ file: index.js:5 ~ LineChart ~ formattedData:', formattedData);
	const data = [
		{
			id    : 'hello',
			color : 'hsl(155, 70%, 50%)',
			data  : formattedData.reverse(),
		},
	];

	const renderSliceTooltip = ({ slice }) => {
		console.log('🚀 ~ file: index.js:17 ~ renderSliceTooltip ~ slice:', slice);

		return (
			<div className={styles.tooltip_div}>
				<div className={styles.title}>
					Date:
					{/* <div className={styles.amount}>{data?.x}</div>
				</div>
				<div className={styles.title}>
					Cogopoints:
					<div className={styles.amount}>{data?.y}</div> */}
				</div>
			</div>
		);
	};

	return (
		<ResponsiveLine
			data={data}
			margin={{ top: 10, right: 40, bottom: 45, left: 60 }}
			xScale={{ type: 'point' }}
			xFormat=" >-"
			yScale={{
				type    : 'linear',
				min     : 'auto',
				stacked : true,
				reverse : false,
			}}
			yFormat=" >-.2f"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : `${startCase(transactionType)}ed Month`,
				legendOffset   : 36,
				legendPosition : 'middle',
			}}
			axisLeft={{
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : `${startCase(transactionType)}ed Amount (${currencyCode})`,
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
			sliceTooltip={renderSliceTooltip}
		/>
	);
}

export default LineChart;
