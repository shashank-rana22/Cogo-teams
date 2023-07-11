import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { EMPLOYEE_DEVICE_DETAILS } from '../../configurations/employeeDataMapping';

import styles from './styles.module.css';

function DeviceDetails({ deviceData, className }) {
	const [employeeDeviceData] = deviceData || [];

	return (
		<>
			<div className={styles.heading}>Device Details :</div>
			<div className={styles.container}>
				{EMPLOYEE_DEVICE_DETAILS.map((val) => (
					<div className={styles[className || 'detail']} key={val.key}>
						<div className={styles.label}>
							{val.label}
							{' '}
							:
						</div>
						<div className={styles.employee_detail}>
							{val.prefix}
							{' '}
							{val.type === 'amount' ? formatAmount({
								amount   : employeeDeviceData?.[val.key],
								currency : GLOBAL_CONSTANTS.currency_code.INR,
							})
								: startCase(employeeDeviceData?.[val.key]) || '-'}
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default DeviceDetails;
