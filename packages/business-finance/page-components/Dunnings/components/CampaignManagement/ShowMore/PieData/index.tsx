import { ResponsivePie } from '@cogoport/charts/pie';
import React from 'react';

import styles from './styles.module.css';

function PieData() {
	const pieData = [
		{
			data: [
				{
					id    : 'a',
					value : 30,
				},
				{
					id    : 'b',
					value : 60,
				},
			],
			label      : 'Rate',
			percentage : 'X%',
		},
		{
			data: [
				{
					id    : 'a',
					value : 30,
				},
				{
					id    : 'b',
					value : 60,
				},
			],
			label      : 'Rate',
			percentage : 'X%',
		},
		{
			data: [
				{
					id    : 'a',
					value : 30,
				},
				{
					id    : 'b',
					value : 60,
				},
			],
			label      : 'Rate',
			percentage : 'X%',
		},
		{
			data: [
				{
					id    : 'a',
					value : 30,
				},
				{
					id    : 'b',
					value : 60,
				},
			],
			label      : 'Rate',
			percentage : 'X%',
		},
		{
			data: [
				{
					id    : 'a',
					value : 30,
				},
				{
					id    : 'b',
					value : 60,
				},
			],
			label      : 'Rate',
			percentage : 'X%',
		},

	];

	return (
		<div>
			<div style={{ display: 'flex' }}>
				{	pieData?.map((pie) => (
					<div key={pie?.label}>
						<div className={styles.pie_section}>
							<div className={styles.center_info}>
								<div>{pie?.percentage}</div>
							</div>
							<ResponsivePie
								data={pie?.data}
								margin={{
									top    : 2,
									right  : 2,
									bottom : 2,
									left   : 2,
								}}
								innerRadius={0.6}
								colors={['#12c0c9', '#c5ebed']}
								borderWidth={1}
								borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
								isInteractive
								enableArcLinkLabels={false}
								enableArcLabels={false}
							/>
							<div>{pie?.label}</div>
						</div>

					</div>
				))}
			</div>

		</div>
	);
}

export default PieData;
