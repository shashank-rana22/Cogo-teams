import React from 'react';

import styles from './styles.module.css';

const filedsToShow = {
	name          : 'Name of the contact',
	email         : 'Email ID',
	mobile_number : 'Mobile Number',
	role          : 'Role in Organisation',
};

function VendorContact({
	detail,
}) {
	return (
		<div
			className={styles.container}
		>
			<div className={styles.title}>
				Vendor Contact
			</div>
			<div className={styles.body}>
				{
					(detail || []).map((item) => (
						<div className={styles.single_record}>
							{
								Object.keys(filedsToShow).map((wantedField) => {
									const val = item[wantedField];
									return (
										<div style={{ display: 'flex', flexDirection: 'column', flexBasis: '25%' }}>
											<div className={styles.label}>
												{filedsToShow[wantedField]}
											</div>
											<div className={styles.value}>
												{val || '---'}
											</div>
										</div>
									);
								})
							}
						</div>
					))
				}
			</div>
		</div>
	);
}

export default VendorContact;
