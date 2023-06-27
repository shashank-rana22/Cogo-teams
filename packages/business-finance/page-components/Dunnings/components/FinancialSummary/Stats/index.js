import { Bar } from '@cogoport/charts/bar';
import { Toggle } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function Stats() {
	const [isGraphView, setIsGraphView] = useState(true);
	const keys = ['collected', 'totalOutstanding'];
	const myData = [
		{
			month            : 'Jan',
			collected        : 100,
			totalOutstanding : 144,
		},
		{
			month            : 'Feb',
			collected        : 100,
			totalOutstanding : 144,
		},
		{
			month            : 'Mar',
			collected        : 100,
			totalOutstanding : 144,
		},
	];

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.flex_align}>
					<div className={styles.subject}>Statistics</div>
					<div><IcMInfo /></div>
				</div>
				<div>
					<Toggle
						name="view"
						size="md"
						disabled={false}
						onLabel="Linear View"
						offLabel="Graph View"
						onChange={() => setIsGraphView(!isGraphView)}
					/>
				</div>
			</div>
			{isGraphView ? (
				<div>
					<Bar
						className="barGraph"
						colors={['#DDEBC0', '#ACDADF']}
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
			)
				: null}

		</div>
	);
}

export default Stats;
