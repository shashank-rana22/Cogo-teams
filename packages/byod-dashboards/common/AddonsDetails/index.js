import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { EMPLOYEE_ADDON_DETAILS } from '../../configurations/employeeDataMapping';

import styles from './styles.module.css';

function AddonsDetails({ data = {}, className = '' }) {
	const { addon_details } = data || {};

	return (
		<div>
			<div className={styles.heading}>Addon Details :</div>

			<div className={styles.container}>
				{addon_details?.map((device) => (
					<div className={styles[className || 'detail']} key={device.key}>

						{EMPLOYEE_ADDON_DETAILS.map((val) => (
							<div className={styles.employee_detail} key={val.key}>
								<div className={styles.label}>
									{val.label}
									{' '}
									:
								</div>

								<div>
									{val.prefix}
									{' '}
									{val.type === 'amount' ? formatAmount({
										amount   : device[val.key],
										currency : GLOBAL_CONSTANTS.currency_code.INR,
									})
										: startCase(device[val.key]) || '-'}
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default AddonsDetails;
