import { ResponsiveLine } from '@cogoport/charts/line';
import { startCase } from '@cogoport/utils';

import { formatValue } from '../../../../utils/formatValue';

import styles from './styles.module.css';

const FIRST_FIELD_VALUE = 0;

function LineChart({ formattedData = [], transactionType = '', currencyCode = '' }) {
	const data = [
		{
			id    : 'amount',
			color : 'hsl(155, 70%, 50%)',
			data  : formattedData,
		},
	];

	const renderSliceTooltip = ({ slice = {} }) => {
		const { data: singleData = {} } = slice?.points?.[FIRST_FIELD_VALUE] || {};

		return (
			<div className={styles.tooltip_div}>
				<div className={styles.title}>
					{`${startCase(transactionType)}ed Month : `}
					<div className={styles.amount}>{singleData?.x}</div>
				</div>
				<div className={styles.title}>
					{`${startCase(transactionType)}ed Amount (${currencyCode}) : `}
					:
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
