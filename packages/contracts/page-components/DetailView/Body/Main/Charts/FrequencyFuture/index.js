import { ResponsiveLine } from '@cogoport/charts/line';
import { addDays, format, getMonth } from '@cogoport/utils';

import styles from './styles.module.css';

const monthsKey = {
	0  : 'Jan',
	1  : 'Feb',
	2  : 'Mar',
	3  : 'Apr',
	4  : 'May',
	5  : 'Jun',
	6  : 'Jul',
	7  : 'Aug',
	8  : 'Sep',
	9  : 'Oct',
	10 : 'Nov',
	11 : 'Dec',
};

function Frequency({
	data,
}) {
	let date = new Date();
	const lineData = [];

	const monthstart = getMonth(date);

	(data || []).forEach((item) => {
		lineData.push({
			x : format(date, 'dd'),
			y : item,
		});

		date = addDays(date, 1);
	});
	const monthend = getMonth(date);

	const finalData = [
		{
			id   : 'price',
			data : lineData,
		},
	];

	return (
		<div className={styles.container}>
			<ResponsiveLine
				data={finalData}
				colors={['#68F877', '#22672B']}
				lineWidth={1}
				enablePoints={false}
				enableGridX={false}
				enableGridY={false}
				margin={{
					top    : 50,
					right  : 110,
					bottom : 50,
					left   : 60,
				}}
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
					orient         : 'bottom',
					tickSize       : 0,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : `${monthsKey[monthstart]}-${monthsKey[monthend]}`,
					legendOffset   : 36,
					legendPosition : 'middle',
				}}
				axisLeft={{
					orient         : 'left',
					tickSize       : 0,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : 'Price (In USD)',
					legendOffset   : -40,
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
						direction         : 'row',
						justify           : false,
						translateX        : -7,
						translateY        : -300,
						itemsSpacing      : 0,
						itemDirection     : 'left-to-right',
						itemWidth         : 80,
						itemHeight        : 20,
						itemOpacity       : 0.75,
						symbolSize        : 12,
						symbolShape       : 'square',
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

export default Frequency;
