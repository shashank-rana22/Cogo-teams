import { startCase } from '@cogoport/utils';
import React from 'react';

import getShortFileName from '../../../../utils/getShortFileName';

import styles from './styles.module.css';

const fieldsToShow = {
	country_id             : 'Country of Registration',
	business_name          : 'Organisation Name',
	registration_number    : 'PAN Number',
	registration_proof_url : 'PAN Document',
	company_type           : 'Type of Company',
	city_id                : 'Company Branch',
};

const DO_NOT_STARTCASE = ['registration_proof_url', 'registration_number'];

function VendorDetails({
	detail,
}) {
	const getDisplayValue = ({ fieldName }) => {
		const val = detail?.[fieldName] || '';

		if (fieldName === 'registration_proof_url') {
			const shortName = getShortFileName({ url: val });
			return (
				<a
					className={styles.icon_container}
					href={val}
					target="_blank"
					rel="noreferrer"
				>
					{shortName}
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/download-icon.svg"
						alt=""
						width="20"
						height="20"
					/>
				</a>
			);
		}

		if (fieldName === 'registration_number') {
			const value = detail?.registration_number?.registrationNumber || detail?.registration_number;
			return value;
		}

		const name_mapping = {
			country_id : `${startCase(detail?.country?.name)}`,
			city_id    : `${startCase(detail?.city?.name)}`,
		};

		return DO_NOT_STARTCASE.includes(fieldName) ? val : name_mapping[fieldName] || startCase(val);
	};

	return (
		<div
			className={styles.container}
		>
			<div className={styles.title}>
				Vendor Details
			</div>

			<div className={styles.body}>
				<div className={styles.single_record}>
					{Object.keys(fieldsToShow).map((fieldName) => (
						<div key={fieldName} className={styles.fields_to_show}>
							<div className={styles.label}>
								{fieldsToShow[fieldName]}
							</div>

							<div className={styles.value}>
								{getDisplayValue({ fieldName })}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default VendorDetails;
