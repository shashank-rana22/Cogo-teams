import { Avatar } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import getHidedUserDetails from '../../utils/getHidedUserDetails';

import styles from './styles.module.css';

function UserCard({ userData = {}, showDirection = false }) {
	const {
		name = '',
		email = '',
		country_code = '',
		user_number = '',
		business_name = '',
	} = userData || {};

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<Avatar personName={name} size="40px" className={styles.styled_avatar} />
				<div className={styles.user_info}>
					<div className={styles.name}>
						{startCase(name) || '-'}
					</div>
					{business_name ? (
						<div className={styles.business_name}>
							{startCase(business_name) || '-'}
						</div>
					) : null}
					<div className={styles.user_contact_details}>
						{email ? (
							<div className={styles.email_info}>
								{getHidedUserDetails({ data: email, type: 'mail' }) }
							</div>
						) : null}

						<div className={styles.contact_info}>
							{user_number ? getHidedUserDetails({
								data        : user_number,
								type        : 'number',
								countryCode : country_code,
							}) : ''}
						</div>
					</div>
				</div>
			</div>
			{showDirection ? <IcMArrowRight className={styles.arrow_icon} /> : null}

		</div>
	);
}

export default UserCard;
