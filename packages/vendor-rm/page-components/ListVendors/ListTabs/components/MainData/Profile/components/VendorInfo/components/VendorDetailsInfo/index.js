import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const geo = getGeoConstants();

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

	const details = [
		{ label: 'Country of Registration', value: country?.name },
		{ label: 'Registration No.', value: registration_number },
		{ label: 'Organisation Name', value: business_name },
		{ label: `${geo.others.registration_number.label} Document`, value: registration_proof_url },
		{ label: 'Type of Company', value: startCase(company_type) },
		{ label: 'Company Branch', value: name },
	];

	return (
		<div className={styles.container}>
			{details.map((item) => (
				<div key={item.label}>
					<div className={styles.top}>
						{item.label}
					</div>

					<div className={styles.bottom}>
						{item.label === `${geo.others.registration_number.label} Document`
							? (
								<div className={styles.download}>
									<a
										href={item.value}
										target="_blank"
										className={styles.link}
										rel="noreferrer"
									>
										{item.value}
									</a>

									<div>
										<img
											src={GLOBAL_CONSTANTS.image_url.download_icon_svg}
											alt="icon"
										/>
									</div>
								</div>
							)
							: item.value }
					</div>
				</div>
			))}
		</div>
	);
}

export default VendorDetailsInfo;
