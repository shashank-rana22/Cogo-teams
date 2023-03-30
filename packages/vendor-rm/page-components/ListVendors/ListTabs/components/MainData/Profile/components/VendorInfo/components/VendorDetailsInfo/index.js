import { IcMCrossInCircle, IcMDownload } from '@cogoport/icons-react';
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
		city,
	} = data?.vendor_details || {};

	const { name } = city || {};

	const checkVerified = (title, value) => {
		if (title === 'GST Certificate') {
			return (
				<div className={styles.download}>
					<a
						href={value}
						target="_blank"
						className={styles.link}
						style={{
							color: '#F68B21',
						}}
						rel="noreferrer"
					>
						{value}
					</a>
					<div>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/download-icon.svg"
							alt="icon"
						/>
					</div>
				</div>
			);
		}
		return (
			<div className={styles.di}>
				<span className={styles.txt} style={{ color: 'red' }}>{value}</span>
				<IcMCrossInCircle />
				<button className={styles.btn}>
					<IcMDownload />
				</button>
			</div>
		);
	};

	const details = [
		{ label: 'Country of Registration', value: country?.name },
		{ label: 'Registration No.', value: registration_number },
		{ label: 'Organisation Name', value: business_name },
		{ label: 'GST Certificate', value: registration_proof_url },
		{ label: 'Type of Company', value: startCase(company_type) },
		{ label: 'Company Branch', value: name },
	];

	return (
		<div className={styles.cont}>
			{details.map((item) => (
				<div className={styles.box_info}>
					<div className={styles.top}>
						{item.label}
					</div>
					<div className={styles.bottom}>
						{(item.label === 'GST Certificate')
							? checkVerified(item.label, item.value) : item.value }
					</div>
				</div>
			))}
		</div>
	);
}

export default VendorDetailsInfo;
