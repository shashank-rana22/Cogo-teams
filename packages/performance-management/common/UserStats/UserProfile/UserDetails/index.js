import { Placeholder } from '@cogoport/components';
import { IcMCall, IcMEmail } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function UserDetails({ userData = {}, loading = false }) {
	const { name, email, mobile_number, designation } = userData || {};

	const showLoading = () => (
		<div className={styles.loading}>
			<Placeholder style={{ borderRadius: '10px', padding: 'auto' }} width="96%" height="88px" />
		</div>
	);
	return (
		<div className={styles.user_info_container}>
			{loading ? showLoading() : (
				<>
					<div className={styles.info_box_1}>
						<div className={styles.name}>
							{startCase(name) || '---'}
						</div>
						<div className={styles.role}>
							{startCase(designation) || '---'}
						</div>
					</div>
					<div className={styles.info_box_2}>
						<div className={styles.mobile_number}>
							<IcMCall style={{ marginRight: '8px' }} />
							{mobile_number || '---'}
						</div>
						<div className={styles.email}>
							<IcMEmail style={{ marginRight: '8px' }} />
							{email || '---'}
						</div>
					</div>
				</>
			)}

		</div>

	);
}

export default UserDetails;
