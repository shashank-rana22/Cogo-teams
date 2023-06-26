import { startCase } from '@cogoport/utils';
import React from 'react';

import { EMPLOYEE_DEVICE_DETAILS } from '../../configurations/employeeDataMapping';

import styles from './styles.module.css';

function DeviceDetails({ deviceData }) {
	const [employeeDeviceData] = deviceData || [];

	return (
		<>
			<div className={styles.heading}>Device Details :</div>
			<div className={styles.container}>
				{EMPLOYEE_DEVICE_DETAILS.map((val) => (
					<div className={styles.detail} key={val.key}>
						<div className={styles.label}>
							{val.label}
							{' '}
							:
						</div>
						<div className={styles.employee_detail}>{startCase(employeeDeviceData?.[val.key])}</div>
					</div>
				))}
			</div>
		</>
	);
}

export default DeviceDetails;
