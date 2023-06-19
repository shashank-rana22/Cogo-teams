import { ResponsiveLine } from '@cogoport/charts/line';
import { startCase } from '@cogoport/utils';

import { TRANSACTION_TYPE } from '../../../../constants';
import { formatValue } from '../../../../utils/formatValue';

import styles from './styles.module.css';

const DEFAULT_INDEX = 0;

function LineChart({ formattedData = [], currencyCode = '', activeStatsCard = '' }) {
	const data = [
		{
			id    : 'amount',
			color : 'hsl(155, 70%, 50%)',
			data  : formattedData.slice().reverse(),
		},
	];

	const renderSliceTooltip = ({ slice = {} }) => {
		const { data: singleData = {} } = slice?.points?.[DEFAULT_INDEX] || {};

		return (
			<div className={styles.tooltip_div}>
				<div className={styles.title}>
					{`${startCase(TRANSACTION_TYPE[activeStatsCard])}ed Month : `}
					<div className={styles.amount}>{singleData?.x}</div>
				</div>
				<div className={styles.title}>
					{`${startCase(TRANSACTION_TYPE[activeStatsCard])}ed Amount (${currencyCode}) : `}
					<div className={styles.amount}>{singleData?.y}</div>
				</div>
			</div>
		);
	};

	return (
		<ResponsiveLine
			data={data}
			margin={{ top: 10, right: 40, bottom: 65, left: 60 }}
			xScale={{ type: 'point' }}
			xFormat=" >-"
			yScale={{
				type    : 'linear',
				min     : 0,
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
				legendOffset   : 36,
				legendPosition : 'middle',
			}}
			axisLeft={{
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : `${startCase(TRANSACTION_TYPE[activeStatsCard])}ed Amount (${currencyCode})`,
				legendOffset   : -55,
				legendPosition : 'middle',
				format         : (v) => formatValue(v),
			}}
			enableGridX={false}
			enablePoints={false}
			pointSize={10}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			useMesh
			enableSlices="x"
			sliceTooltip={(item) => renderSliceTooltip(item)}

		/>

	);
}

export default LineChart;
