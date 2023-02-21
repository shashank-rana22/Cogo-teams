import React from 'react';

import styles from './styles.module.css';

const filedsToShow = {
	name          : 'Name of the contact',
	email         : 'Email ID',
	mobile_number : 'Mobile Number',
	poc_role      : 'Role in Organisation',
};

function VendorContact({
	detail,
}) {
	const getDisplayValue = ({ fieldName }) => {
		const val = detail?.[0]?.[fieldName];

		if (fieldName === 'mobile_number') {
			const { mobile_number = '', mobile_country_code = '' } = detail[0];
			return `${mobile_country_code} ${mobile_number}`;
		}

		return val;
	};

	return (
		<div
			className={styles.container}
		>
			<div className={styles.title}>
				Vendor Contact
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

export default VendorContact;
