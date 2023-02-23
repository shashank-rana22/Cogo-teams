/* eslint-disable jsx-a11y/control-has-associated-label */
import { IcCFtick, IcCFcrossInCircle, IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function VendorDetailsInfo({ data = {} }) {
	const checkVerified = (title, value) => {
		if (title === 'GST Certificate') {
			return (
				<div className={styles.di}>
					<span className={styles.txt} style={{ color: 'orange' }}>{value}</span>
					<IcCFtick />
					<button className={styles.btn}><IcMDownload /></button>
				</div>
			);
		}
		return (
			<div className={styles.di}>
				<span className={styles.txt} style={{ color: 'red' }}>{value}</span>
				<IcCFcrossInCircle />
				<button className={styles.btn}><IcMDownload /></button>
			</div>
		);
	};

	const obj = 	[
		{ label: 'Country of Registration', value: 'India' },
		{ label: 'GST No.', value: startCase(data?.vendor_details?.registration_number) },
		{ label: 'Organisation Name', value: startCase(data?.vendor_details?.business_name) },
		{ label: 'GST Certificate', value: data?.vendor_details?.registration_proof_url },
		{ label: 'Type of Company', value: startCase(data?.vendor_details?.company_type) },
		{ label: 'Company Branch', value: 'Mumbai' },
	];

	return (
		<div className={styles.cont}>
			{obj.map((item) => (
				<div className={styles.box_info}>
					<div className={styles.top}>
						{item.label}
					</div>
					<div className={styles.bottom}>
						{/* {item.value} */}
						{(item.label === 'GST Certificate') ? checkVerified(item.label, item.value) : item.value }
					</div>
				</div>
			)) }
		</div>
	);
}

export default VendorDetailsInfo;
