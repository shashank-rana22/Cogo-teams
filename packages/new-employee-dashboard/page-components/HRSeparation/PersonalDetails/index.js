import { Avatar } from '@cogoport/components';
import { IcMBusiness, IcMEmail, IcMCall, IcMLocation } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function PersonalDetails() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>PERSONAL DETAILS</div>
			<div className={styles.sub_title}>Ticket ID: SEP_23123</div>

			<div className={styles.details}>
				<div className={styles.profile}>
					<Avatar personName="shivam singh" size="44px" />
					<div className={styles.name}>
						<div>Shivam Singh</div>
						<div className={styles.cogo_id}>COGO-ID: COGO0833</div>
					</div>
				</div>
				<div className={styles.single_detail}>
					<IcMBusiness height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 8 }} />
					Senior Software Engineer
				</div>
				<div className={styles.single_detail}>
					<IcMEmail height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 8 }} />
					samplemail.address@cogoport.com
				</div>
				<div className={styles.single_detail}>
					<IcMCall height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 8 }} />
					+91 9876567654
				</div>
				<div className={styles.single_detail}>
					<IcMLocation height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 8 }} />
					Mumbai, India
				</div>
			</div>
		</div>
	);
}

export default PersonalDetails;
