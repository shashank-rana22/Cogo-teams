import { Bar } from '@cogoport/charts/bar';
import React from 'react';

function Stats() {
	const keys = ['collected', 'totalOutstanding'];
	const myData = [
		{
			month            : 'Jan',
			collected        : 100,
			//   collectedColor        : 'hsl(217, 90%, 61%)',
			totalOutstanding : 144,
			// totalOutstandingColor : 'hsl(313, 70%, 50%)',
		},
		{
			month            : 'Feb',
			collected        : 100,
			// collectedColor        : 'hsl(217, 90%, 61%)',
			totalOutstanding : 144,
			// totalOutstandingColor : 'hsl(313, 70%, 100%)',
		},
		{
			month            : 'Mar',
			collected        : 100,
			// collectedColor        : 'hsl(217, 90%, 61%)',
			totalOutstanding : 144,
			// totalOutstandingColor : 'hsl(313, 70%, 50%)',
		},
	];

	return (
		<div>
			bar chart here
			<div>
				<Bar
					className="barGraph"
					// ref={forwardRef}
					width={900}
					height={500}
					margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
					data={myData}
					indexBy="month"
					keys={keys}
					padding={0.2}
					labelTextColor="inherit:darker(1.4)"
					labelSkipWidth={16}
					labelSkipHeight={16}
					layout="vertical"
					groupMode="stack"
					enableGridY={false}
					enableGridX
					legends={[
						{
							anchor            : 'bottom-right',
							direction         : 'column',
							justify           : false,
							translateX        : 80,
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
		</div>
	);
}

export default Stats;
