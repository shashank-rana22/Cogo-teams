import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { EMPLOYEE_ADDON_DETAILS } from '../../configurations/employeeDataMapping';

import styles from './styles.module.css';

function AddonsDetails({ data = {} }) {
	const { employee_device_details = {} } = data || {};
	const { addon_details : details } = employee_device_details || {};
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Addon Details :</div>

			<div>
				{ (details || []).map((detail) => (
					<div key={detail.addon_type} className={styles.detail}>
						<div className={styles.label_container}>
							{EMPLOYEE_ADDON_DETAILS.map((val) => (
								<div key={val.label}>
									{val.label}
									{' '}
									:
								</div>
							))}
						</div>
						<div className={styles.employee_detail}>
							{EMPLOYEE_ADDON_DETAILS.map((val) => (
								<div key={val.key}>
									{val.type === 'amount' ? formatAmount({
										amount   : detail[val.key],
										currency : GLOBAL_CONSTANTS.currency_code.INR,
									})
										: startCase(detail[val.key]) || '-'}
									{' '}

								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default AddonsDetails;
