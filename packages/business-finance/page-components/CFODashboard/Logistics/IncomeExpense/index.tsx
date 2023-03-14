import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';
import ResponsiveBarChart from './ResponsiveBarChart/index'

import styles from './styles.module.css';

function IncomeExpense() {
	const barData=[
		{
		  "months": "Jan",
		  "income": 79,
		  "expense": 154,
		},
		{
		  "months": "Feb",
		  "income": 111,
		  "expense": 185,
		},
		{
		  "months": "Mar",
		  "income": 164,
		  "expense": 70,
		},
		{
		  "months": "Apr",
		  "income": 188,
		  "expense": 165,
		},
		{
		  "months": "Jun",
		  "income": 166,
		  "expense": 200,
		},
		{
		  "months": "Jul",
		  "income": 115,
		  "expense": 68,
		},
		{
		  "months": "Aug",
		  "income": 115,
		  "expense": 177,
		}
	  ]
	return (
		<div>
			<div className={styles.card}>
				<div>
					Income & Expense
					<IcMInfo />
					<div className={styles.border} />
				</div>
				<div className={styles.responsive}>
					<ResponsiveBarChart barData={barData}/>
				</div>
			</div>
		</div>
	);
}

export default IncomeExpense;
