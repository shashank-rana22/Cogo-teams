import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { EMPLOYEE_DEVICE_DETAILS } from '../../configurations/employeeDataMapping';

import styles from './styles.module.css';

const DEFAULT_VALUE = 1;

function DeviceDetails({ data = {} }) {
	const { employee_device_details = {} } = data || {};
	const { device_details = [], invoice_url } = employee_device_details || [];
	const details = device_details[device_details.length - DEFAULT_VALUE] || [];

	const onClickOpen = (url) => {
		window.open(url, '_blank');
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Device Details :</div>
			<div className={styles.item_container}>

				{EMPLOYEE_DEVICE_DETAILS.map((val) => (
					<div className={styles.detail} key={val.key}>
						<div className={styles.label}>
							{val.label}
							{' '}
							:
						</div>

						<div className={styles.employee_detail}>
							{val.prefix}
							{' '}
							{val.type === 'amount' ? formatAmount({
								amount   : details?.[val.key],
								currency : GLOBAL_CONSTANTS.currency_code.INR,
							})
								: startCase(details?.[val.key]) || '-'}
						</div>
					</div>
				))}
			</div>
			<div className={styles.invoice}>
				<div> Invoice :</div>
				<Button
					size="md"
					type="button"
					themeType="tertiary"
					className={styles.employee_detail}
					onClick={() => onClickOpen(invoice_url)}
				>
					View
				</Button>
			</div>
		</div>
	);
}

export default DeviceDetails;
