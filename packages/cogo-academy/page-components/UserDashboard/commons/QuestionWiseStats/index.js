import { ResponsiveRadialBar } from '@cogoport/charts/radial-bar';

import styles from './styles.module.css';

function QuestionWiseStats() {
	const data = [

		{
			id   : 'Questions Answered',
			data : [
				{
					x : 'Attempted',
					y : 0,
				},
				{
					x : 'Correct',
					y : 20,
				},
				{
					x : 'Incorrect',
					y : 30,
				},
			],
		},
		{
			id   : 'Questions Attempted',
			data : [
				{
					x : 'Attempted',
					y : 90,
				},
				{
					x : 'Correct',
					y : 0,
				},
				{
					x : 'Incorrect',
					y : 0,
				},
			],
		},
	];

	return (
		<div className={styles.radial_bar_container}>
			<ResponsiveRadialBar
				data={data}
				valueFormat=">-.2f"
				endAngle={360}
				innerRadius={0.75}
				padding={0.05}
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
						anchor        : 'right',
						direction     : 'column',
						justify       : false,
						translateX    : 120,
						translateY    : 0,
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
