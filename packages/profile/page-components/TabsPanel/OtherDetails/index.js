import React from 'react';

import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';

function OtherDetails({ data = {} }) {
	const info = {
		heading : 'Custom Field Information',
		details : [
			{ label: 'Medical Insurance Applicable', value: true },
			{ label: 'Medical Policy Number', value: '24646154' },
		],
	};

	const otherInfo = [
		{ label: 'Joining Date', key: 'processed', value: 'date_of_joining' },
		{ label: 'Age in Organsization', key: 'processed', value: 'age_in_organization' },
		{ label: 'Reports To', key: 'details', value: 'reporting_manager_name' },
		{ label: 'HRBP', key: 'details', value: 'hrbp_name' },
		{ label: 'Employee Code', key: 'details', value: 'employee_code' },
	];

	return (
		<div className={styles.tab_content}>

			<div className={styles.main_container}>
				<div className={styles.heading}>
					<span className={styles.personal}>OTHER DETAILS</span>
					<span className={styles.detail}>View and manage employee details</span>
				</div>
				<div className={styles.info_container}>
					<DetailsCard heading={info.heading} details={info.details} data={data} />
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} data={data} />
		</div>
	);
}

export default OtherDetails;
