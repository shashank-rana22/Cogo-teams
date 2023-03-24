import { ResponsiveRadialBar } from '@cogoport/charts/radial-bar';

import styles from './styles.module.css';

function QuestionWiseStats({ height = '200px', width = '200px', question_stats = {} }) {
	const { total_questions } = question_stats;

	const radialChartData = () => {
		const data = [];

		const questionAnswered = {
			id   : 'Questions Answered',
			data : [
				{
					x     : 'Attempted',
					y     : 0,
					color : 'hsla(41, 64%, 86%, 1)',
				},
				{
					x     : 'Correct',
					y     : question_stats.correct_questions,
					color : 'hsla(79, 52%, 72%, 1)',
				},
				{
					x     : 'Incorrect',
					y     : question_stats.incorrect_questions,
					color : 'hsla(5, 85%, 82%, 1)',
				},
			],
		};
		const totalAnswered = {
			id   : 'Questions Attempted',
			data : [
				{
					x     : 'Attempted',
					y     : question_stats.question_attempted,
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
		};

		data.push(questionAnswered);
		data.push(totalAnswered);
		return data;
	};

	return (
		<div className={styles.radial_bar_container} style={{ height: `${height}`, width: `${width}` }}>
			<ResponsiveRadialBar
				data={radialChartData()}
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
				maxValue={total_questions}
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
