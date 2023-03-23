import { ResponsiveRadialBar } from '@cogoport/charts/radial-bar';

import styles from './styles.module.css';

function QuestionWiseStats({ height = '200px', width = '200px', chart_data = [] }) {
	const data = [

		{
			id   : 'Questions Answered',
			data : [
				{
					x     : 'Attempted',
					y     : 0,
					color : 'hsla(41, 64%, 86%, 1)',
				},
				{
					x     : 'Correct',
					y     : 20,
					color : 'hsla(79, 52%, 72%, 1)',
				},
				{
					x     : 'Incorrect',
					y     : 30,
					color : 'hsla(5, 85%, 82%, 1)',
				},
			],
		},
		{
			id   : 'Questions Attempted',
			data : [
				{
					x     : 'Attempted',
					y     : 90,
					color : 'hsla(41, 64%, 86%, 1)',
				},
				{
					x     : 'Correct',
					y     : 0,
					color : 'hsla(79, 52%, 72%, 1)',
				},
				{
					x     : 'Incorrect',
					y     : 0,
					color : 'hsla(5, 85%, 82%, 1)',
				},
			],
		},
	];

	return (
		<div className={styles.radial_bar_container} style={{ height: `${height}`, width: `${width}` }}>
			<ResponsiveRadialBar
				data={data}
				valueFormat=">-.2f"
				endAngle={360}
				innerRadius={0.75}
				padding={0.05}
				colors={{ datum: 'data.color' }}
				cornerRadius={24}
				margin={{ top: 0, right: 100, bottom: 0, left: 0 }}
				borderColor={{
					from      : 'color',
					modifiers : [
						[
							'darker',
							'1',
						],
					],
				}}
				radialAxisStart={null}
				circularAxisOuter={null}
				labelsSkipAngle={9}
				maxValue={100}
				legends={[
					{
						anchor        : 'bottom-right',
						direction     : 'column',
						justify       : false,
						translateX    : 120,
						translateY    : -50,
						itemsSpacing  : 6,
						itemDirection : 'left-to-right',
						itemWidth     : 100,
						itemHeight    : 18,
						itemTextColor : '#828282',
						symbolSize    : 10,
						symbolShape   : 'circle',
					}]}

			/>
		</div>
	);
}

export default QuestionWiseStats;
