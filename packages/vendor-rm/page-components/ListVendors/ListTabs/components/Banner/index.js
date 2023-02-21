/* eslint-disable max-len */
import { IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Banner({ data = {} }) {
	// console.log('data::', data);
	const vect = [
		{ label: 'Vendor ID', value: '#3728900' },
		{ label: 'KYC Status', value: startCase(data?.vendor_details?.kyc_status) },
		{ label: 'GST/PAN No.', value: startCase(data?.vendor_details?.registration_number) },
		{ label: 'Service Category', value: startCase(data?.services?.[0]?.category) },
		{ label: 'Service Sub-Category', value: startCase(data?.services?.[0]?.sub_category) },
		{ label: 'Account Created on', value: '28 May 2022' },
	];

	const checkVerified = (value) => {
		if (value === 'Verified') {
			return (
				<>
					<IcCFtick />
					<span style={{ color: 'green' }}>{value}</span>
				</>
			);
		}
		if (value === 'Rejected') {
			return (
				<>
					<IcCFcrossInCircle />
					<span style={{ color: 'red' }}>{value}</span>
				</>
			);
		}
		return (
			<>
				<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/provisional-icon.svg" alt="pending" />
				<span style={{ color: 'orange' }}>{value}</span>
			</>
		);
	};

	return (
		<div className={styles.box1}>
			<div className={styles.box1_heading}>
				{data?.vendor_details?.business_name}
			</div>
			<div className={styles.box1_data}>
				{vect.map((item) => (
					<div className={styles.small_box}>
						<div className={styles.box1_data_top}>
							{item.label}
						</div>
						<div className={styles.box1_data_bottom}>
							{(item.label === 'KYC Status') ? checkVerified(item.value) : item.value }
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Banner;
