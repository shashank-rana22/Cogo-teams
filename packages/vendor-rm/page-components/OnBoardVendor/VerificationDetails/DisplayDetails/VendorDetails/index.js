import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const filedsToShow = {
	country_id             : 'Country of Registration',
	registration_number    : 'GST No.',
	business_name          : 'Organisation Name',
	registration_proof_url : 'GST Certificate',
	company_type           : 'Type of Company',
	city_id                : 'Company Branch',
};

function VendorDetails({
	detail,
}) {
	return (
		<div
			className={styles.container}
		>
			<div className={styles.title}>
				Vendor Details
			</div>
			<div className={styles.body}>
				{
					// Object.keys(detail || []).map((item) => (
					<div className={styles.single_record}>
						{
								Object.keys(filedsToShow).map((wantedField) => {
									const val = detail?.[wantedField] || '';
									return (
										<div style={{ display: 'flex', flexDirection: 'column', flexBasis: '25%' }}>
											<div className={styles.label}>
												{filedsToShow[wantedField]}
											</div>
											<div className={styles.value}>
												{startCase(val)}
											</div>
										</div>
									);
								})
							}
					</div>
					// ))
				}
			</div>
		</div>
	);
}

export default VendorDetails;
