import { IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
// import { saveAs } from 'file-saver';
import React from 'react';

import getShortFileName from '../utils/getShortFileName';

import styles from './styles.module.css';

const filedsToShow = {
	country_id             : 'Country of Registration',
	registration_number    : 'GST No.',
	business_name          : 'Organisation Name',
	registration_proof_url : 'GST Certificate',
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
					<IcMDownload className={styles.icon} />
				</a>
			);
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
					{
						Object.keys(filedsToShow).map((fieldName) => (
							<div style={{ display: 'flex', flexDirection: 'column', flexBasis: '25%' }}>

								<div className={styles.label}>
									{filedsToShow[fieldName]}
								</div>

								<div className={styles.value}>
									{getDisplayValue({ fieldName })}
								</div>

							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default VendorDetails;
