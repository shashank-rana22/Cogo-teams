import { ResponsiveLine } from '@cogoport/charts/line';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import { formatValue } from '../../../../utils/formatValue';

import styles from './styles.module.css';

const renderSliceTooltip = ({ slice = {}, transactionType = '', currencyCode = '' }) => {
	const { data: singleData = {} } = slice?.points?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	return (
		<div className={styles.tooltip}>
			<div className={styles.title}>
				{`${startCase(transactionType)}ed Month : `}
				<div className={styles.amount}>{singleData?.x}</div>
			</div>
			<div className={styles.title}>
				{`${startCase(transactionType)}ed Amount (${currencyCode}) : `}
				<div className={styles.amount}>{singleData?.y}</div>
			</div>
		</div>
	);
};

function LineChart({ formattedData = [], transactionType = '', currencyCode = '' }) {
	const data = [
		{
			id    : 'amount',
			color : 'hsl(155, 70%, 50%)',
			data  : formattedData.slice().reverse(),
		},
	];

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
				legend         : `${startCase(transactionType)}ed Amount (${currencyCode})`,
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
			sliceTooltip={(item) => renderSliceTooltip(item, transactionType, currencyCode)}

		/>

	);
}

export default LineChart;
