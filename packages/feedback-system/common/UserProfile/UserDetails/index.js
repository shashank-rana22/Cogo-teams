import { Placeholder } from '@cogoport/components';
import { IcMCall, IcMEmail } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function UserDetails({ userData = {}, loading = false }) {
	const { name, email, mobile_number, role } = userData || {};

	const showLoading = () => (
		<div style={{ margin: '16px' }}>
			<Placeholder margin="0px 0px 16px" width="70%" height="30px" />
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
							{startCase(role) || '---'}
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
