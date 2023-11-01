import { ResponsiveLine } from '@cogoport/charts/line';
import { cl } from '@cogoport/components';
import React, { useState } from 'react';

import getGraphData from './getGraphData';
import styles from './styles.module.css';

const FILTER_CONTROLS = ['1D', '1W', '1M', '6M', '1Y'];

function Analytics() {
	const [selectedFilter, setSelectedFilter] = useState('1D');

	const dummyData = getGraphData();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.label}>
					Analytics
				</div>

				<div className={styles.filter_container}>
					{FILTER_CONTROLS.map(
						(itm) => (
							<div
								key={itm}
								role="presentation"
								onClick={() => setSelectedFilter(itm)}
								className={cl`${styles.filter_element} 
									${selectedFilter === itm ? styles.selected_filter_element : ''}`}
							>
								{itm}
							</div>
						),
					)}
				</div>
			</div>

			<div className={styles.graph_container}>
				<ResponsiveLine
					data={dummyData}
					margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
					xScale={{ type: 'point' }}
					yScale={{
						type    : 'linear',
						min    	: 'auto',
						max    	: 'auto',
						stacked : true,
						reverse : false,
					}}
					yFormat=" >-.2f"
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize    	  : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legend    	    : '',
						legendOffset   : 36,
						legendPosition : 'middle',
					}}
					axisLeft={{
						tickSize    	  : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legend    	    : '',
						legendOffset   : -40,
						legendPosition : 'middle',
					}}
					enablePoints={false}
					pointSize={2}
					pointColor={{ theme: 'background' }}
					pointBorderColor={{ from: 'serieColor' }}
					pointLabelYOffset={-24}
					useMesh
					legends={[
						{
							anchor    	   : 'top-right',
							direction    	: 'row',
							justify    	  : false,
							translateX    : 36,
							translateY    : -37,
							itemWidth    	: 66,
							itemHeight    : 26,
							itemsSpacing  : 8,
							symbolSize    : 11,
							symbolShape   : 'circle',
							itemDirection : 'left-to-right',
							itemTextColor : '#777',
							effects    	  : [
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

export default Analytics;
