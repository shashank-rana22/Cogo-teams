import { ResponsiveLine } from '@cogoport/charts/line';

import styles from './styles.module.css';

const MONTH_START_INDEX = 0;
const MONTH_END_INDEX = 3;

function Graph({ dataKeys = {} }) {
	const graphData = [{
		id    : 'Promo',
		color : 'hsl(313, 70%, 50%)',
		data  : dataKeys?.promotion_per_month?.map((item) => ({
			x : item?.month?.slice(MONTH_START_INDEX, MONTH_END_INDEX),
			y : item?.discount_amount,
		})),
	}];
	return (
		<div className={styles.graph_card}>
			<ResponsiveLine
				data={graphData}
				margin={{ top: 50, right: 110, bottom: 50, left: 110 }}
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
					tickSize       : 5,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : 'Months',
					legendOffset   : 44,
					legendPosition : 'middle',
				}}
				axisLeft={{
					tickSize       : 5,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : 'Amount',
					legendOffset   : -80,
					legendPosition : 'middle',
				}}
				pointSize={10}
				pointColor={{ theme: 'background' }}
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-12}
				useMesh
				legends={[
					{
						anchor            : 'bottom-right',
						direction         : 'column',
						justify           : false,
						translateX        : 100,
						translateY        : 0,
						itemsSpacing      : 0,
						itemDirection     : 'left-to-right',
						itemWidth         : 80,
						itemHeight        : 20,
						itemOpacity       : 0.75,
						symbolSize        : 12,
						symbolShape       : 'circle',
						symbolBorderColor : 'rgba(0, 0, 0, .5)',
						effects           : [
							{
								on    : 'hover',
								style : {
									itemBackground : 'rgba(0, 0, 0, .03)',
									itemOpacity    : 1,
								},
							},
						],
					},
				]}
			/>
		</div>
	);
}

export default Graph;
