/* eslint-disable no-mixed-spaces-and-tabs */
import { ResponsivePie } from '@cogoport/charts/pie';

import styles from './styles.module.css';

function ShowMore({ dropdown, rowId }) {
	const mockPieData = [
		{
		  id    : 'hack',
		  label : 'hack',
		  value : 239,
		  color : 'hsl(104, 70%, 50%)',
		},
		{
		  id    : 'make',
		  label : 'make',
		  value : 170,
		  color : 'hsl(162, 70%, 50%)',
		},
		{
		  id    : 'go',
		  label : 'go',
		  value : 322,
		  color : 'hsl(291, 70%, 50%)',
		},
		{
		  id    : 'lisp',
		  label : 'lisp',
		  value : 503,
		  color : 'hsl(229, 70%, 50%)',
		},
		{
		  id    : 'scala',
		  label : 'scala',
		  value : 584,
		  color : 'hsl(344, 70%, 50%)',
		},
	  ];

	if (dropdown === rowId) {
		return (
			<div className={styles.dropdown_container_visible}>
				<div className={styles.data_container}>
					<div style={{ width: '40%' }}>
						<div>
							<div className={styles.heading}>Service Type</div>
							<div>XXXX</div>
							<div className={styles.heading}>Cogo Entity</div>
							<div>XXXX</div>
						</div>
					</div>

					<div style={{ width: '50%' }}>
						<div>
							<h1>Charts here</h1>
							<ResponsivePie
								theme={{
            	axis: {
            		domain: {
            			line: {
            				stroke: 'red',
											},
            		},
            		legend: {
            			text: {
            				fill: 'red',
											},
            		},
            		ticks: {
            			line: {
            				stroke      : 'red',
            				strokeWidth : 1,
											},
            			text: {
            				fill: 'red',
											},
            		},
									},
            	legends: {
            		text: {
            			fill: 'red',
										},
            	},
            	tooltip: {
            		container: {
            			background : 'pink',
            			color      : 'red',
            		},
            	},
								}}
								data={mockPieData}
								margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
								innerRadius={0.5}
								padAngle={0.7}
								cornerRadius={3}
								activeOuterRadiusOffset={8}
								borderWidth={1}
								borderColor={{
            	from      : 'color',
            	modifiers : [
            		[
            			'darker',
            			0.2,
										],
            	],
								}}
								arcLinkLabelsSkipAngle={10}
								arcLinkLabelsTextColor="red"
								arcLinkLabelsThickness={2}
								arcLinkLabelsColor={{ from: 'color' }}
								arcLabelsSkipAngle={10}
								arcLabelsTextColor={{
            	from      : 'color',
            	modifiers : [
            		[
            			'darker',
            			2,
										],
            	],
								}}
								defs={[
            	{
            		id         : 'dots',
            		type       : 'patternDots',
            		background : 'inherit',
            		color      : 'rgba(255, 255, 255, 0.3)',
            		size       : 4,
            		padding    : 1,
            		stagger    : true,
									},
            	{
            		id         : 'lines',
            		type       : 'patternLines',
            		background : 'inherit',
            		color      : 'rgba(255, 255, 255, 0.3)',
            		rotation   : -45,
            		lineWidth  : 6,
            		spacing    : 10,
									},
								]}
								legends={[
            	{
            		anchor        : 'bottom',
            		direction     : 'row',
            		justify       : false,
            		translateX    : 0,
            		translateY    : 56,
            		itemsSpacing  : 0,
            		itemWidth     : 100,
            		itemHeight    : 18,
            		itemTextColor : 'red',
            		itemDirection : 'left-to-right',
            		itemOpacity   : 1,
            		symbolSize    : 18,
            		symbolShape   : 'circle',
            		effects       : [
            			{
            				on    : 'hover',
            				style : {
                        		itemTextColor: 'blue',
												},
											},
										],
									},
								]}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return <div className={styles.dropdown_container_invisible} />;
}

export default ShowMore;
