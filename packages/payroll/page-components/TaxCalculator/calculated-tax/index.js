import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

export default function CalculatedTax(getTax = {}) {
	const ANNUALINCOME = 'Annual Income (Annual Base Salary[A] + Flexible Benefits[B])';
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{ANNUALINCOME}
				:
				<div className={styles.data}>{getTax?.getTax?.annual_income}</div>
			</div>
			<div className={styles.heading}>
				Annual Taxable Income after deductions :
				<div className={styles.data}>
					{getTax?.getTax?.annual_taxable_income}
				</div>
			</div>
			<div className={styles.heading}>
				total tax per year:
				<div className={styles.data}>
					{getTax?.getTax?.total_tax}
				</div>
			</div>
			<div className={styles.heading}>
				tds per month :
				<div className={styles.data}>
					{getTax?.getTax ? getTax.getTax['tax per month'] : GLOBAL_CONSTANTS.zeroth_index}
				</div>
			</div>
		</div>
	);
}
