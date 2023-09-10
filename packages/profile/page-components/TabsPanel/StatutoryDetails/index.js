import React from 'react';

import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';

function StatutoryDetails() {
	const info = {
		heading : 'BASIC DETAILS',
		details : [
			{ label: 'PF Applicable', value: true },
			{ label: 'PF Pension Applicable', value: true },
			{ label: 'Employee PF Ceiling Applicable', value: true },
			{ label: 'Employer PF Ceiling Applicable', value: true },
			{ label: 'PF Joining Date', value: '23/03/2022' },
			{ label: 'PF Number', value: '00125510' },
			{ label: 'UAN Number', value: '54893120051' },
			{ label: 'PF Wage', value: 0 },
			{ label: 'VPF', value: '0.0%' },
			{ label: 'ESIC Applicable', value: true },
			{ label: 'PT Applicable', value: true },
			{ label: 'LWF Applicable', value: true },
			{ label: 'IT Applicable', value: true },
			{ label: 'Gratuity Applicable', value: true },
			{ label: 'NPS Applicable', value: false },
			{ label: 'Decimal Rates Allowed', value: true },
			{ label: 'Previous year Tax Regime', value: 'Old Regime' },
			{ label: 'Tax Regime', value: 'Old Regime' },
			{ label: 'Tax Regime Updated by', value: 'Ganesh Chandak' },
			{ label: 'Tax Regime Updated at', value: '12:13, 23/03/2022' },
		],
	};

	const otherInfo = [
		{ label: 'PF Number', value: '00125510' },
		{ label: 'UAN Number', value: '54893120051' },
		{ label: 'Tax Regime', value: 'Old Regime' },
	];
	return (
		<div className={styles.tab_content}>

			<div className={styles.main_container}>
				<div className={styles.heading}>
					<span className={styles.personal}>STATUTORY DETAILS</span>
					<span className={styles.detail}>View and manage employee details</span>
				</div>
				<div className={styles.info_container}>
					<DetailsCard heading={info.heading} details={info.details} />
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} />
		</div>
	);
}

export default StatutoryDetails;
