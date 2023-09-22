import { Avatar } from '@cogoport/components';
import { IcMBusiness, IcMEmail, IcMCall, IcMLocation } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function PersonalDetails({ data = {} }) {
	const { applicant_details = {} } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.title}>APPLICANT DETAILS</div>
			<div className={styles.sub_title}>
				Ticket ID:
				{' '}
				{applicant_details?.ticket_id || '-'}
			</div>

			<div className={styles.details}>
				<div className={styles.profile}>
					<Avatar personName={applicant_details?.employee_name} size="44px" />
					<div className={styles.name}>
						<div>{applicant_details?.employee_name || '-'}</div>
						<div className={styles.cogo_id}>
							COGO-ID:
							{' '}
							{applicant_details?.cogo_id || '-'}
						</div>
					</div>
				</div>
				<div className={styles.single_detail}>
					<IcMBusiness height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 8 }} />
					{applicant_details?.designation || '-'}
				</div>
				<div className={styles.single_detail}>
					<IcMEmail height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 8 }} />
					{applicant_details?.cogoport_email || '-'}
				</div>
				<div className={styles.single_detail}>
					<IcMCall height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 8 }} />
					{applicant_details?.mobile_country_code || '-'}
					{' '}
					{applicant_details?.mobile_number || '-'}
				</div>
				<div className={styles.single_detail}>
					<IcMLocation height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 8 }} />
					{applicant_details?.reporting_location || '-'}
				</div>
			</div>
		</div>
	);
}

export default PersonalDetails;
