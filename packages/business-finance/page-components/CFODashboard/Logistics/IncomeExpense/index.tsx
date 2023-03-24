import { Toggle } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

// import ResponsiveBarChart from './ResponsiveBarChart/index';
import ResponsiveLineChart from './ResponsiveLineChart';
import styles from './styles.module.css';

function IncomeExpense() {
	const barData = [
		{
		  months  : 'Jan',
		  income  : 79,
		  expense : 154,
		},
		{
		  months  : 'Feb',
		  income  : 111,
		  expense : 185,
		},
		{
		  months  : 'Mar',
		  income  : 164,
		  expense : 70,
		},
		{
		  months  : 'Apr',
		  income  : 188,
		  expense : 165,
		},
		{
		  months  : 'Jun',
		  income  : 166,
		  expense : 200,
		},
		{
		  months  : 'Jul',
		  income  : 115,
		  expense : 68,
		},
		{
		  months  : 'Aug',
		  income  : 115,
		  expense : 177,
		},
	  ];

	const lineData = 		[

		{
			  id    : 'us',
			  color : '#ACDADF',
			  data  : [
				{
				  x : 'plane',
				  y : 183,
				},
				{
				  x : 'helicopter',
				  y : 264,
				},
				{
				  x : 'boat',
				  y : 132,
				},
				{
				  x : 'train',
				  y : 121,
				},
				{
				  x : 'subway',
				  y : 114,
				},
				{
				  x : 'bus',
				  y : 78,
				},
				{
				  x : 'car',
				  y : 243,
				},
				{
				  x : 'moto',
				  y : 159,
				},
				{
				  x : 'bicycle',
				  y : 95,
				},
				{
				  x : 'horse',
				  y : 133,
				},
				{
				  x : 'skateboard',
				  y : 53,
				},
				{
				  x : 'others',
				  y : 285,
				},
			  ],
		},
		  ];

	return (
		<div>
			<div className={styles.card}>
				<div className={styles.main_div}>
					<div className={styles.text_filters_gap}>
						<div className={styles.text_style}>
							Income & Expense
							<div className={styles.border} />
						</div>
						<div className={styles.icon}>
							<IcMInfo />
						</div>
					</div>
					<div style={{ display: 'flex', gap: '8px' }}>
						<Toggle name="a4" size="md" disabled={false} onLabel="Post Tax" offLabel="Pre Tax" />
						<div style={{ marginTop: '10px' }}>Cash Flow Line Graph</div>
						<Toggle name="a1" size="md" showOnOff disabled={false} />
					</div>
				</div>

				<div className={styles.responsive}>
					<ResponsiveLineChart lineData={lineData} />
				</div>
				{/* <div className={styles.responsive}>
					<ResponsiveBarChart barData={barData} />
				</div> */}
			</div>
		</div>
	);
}

export default IncomeExpense;
