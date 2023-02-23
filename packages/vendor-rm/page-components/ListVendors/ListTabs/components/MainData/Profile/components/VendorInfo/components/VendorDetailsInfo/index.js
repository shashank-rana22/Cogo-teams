/* eslint-disable jsx-a11y/control-has-associated-label */
import { IcCFtick, IcCFcrossInCircle, IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function VendorDetailsInfo({
	data = {},
}) {
	const {
		country,
		registration_number,
		business_name,
		registration_proof_url,
		company_type,
	} = data?.vendor_details || {};

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

	const details = [
		{ label: 'Country of Registration', value: country?.name },
		{ label: 'GST No.', value: startCase(registration_number) },
		{ label: 'Organisation Name', value: startCase(business_name) },
		{ label: 'GST Certificate', value: registration_proof_url },
		{ label: 'Type of Company', value: startCase(company_type) },
		{ label: 'Company Branch', value: 'Mumbai' },
	];

	return (
		<div className={styles.cont}>
			{
				details.map((item) => (
					<div className={styles.box_info}>
						<div className={styles.top}>
							{item.label}
						</div>
						<div className={styles.bottom}>
							{(item.label === 'GST Certificate')
								? checkVerified(item.label, item.value) : item.value }
						</div>
					</div>
				))
			}
		</div>
	);
}

export default VendorDetailsInfo;
