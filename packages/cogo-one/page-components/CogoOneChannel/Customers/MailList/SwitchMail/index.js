import { Avatar, cl } from '@cogoport/components';
import React from 'react';

import getUserNameFromEmail from '../../../../../helpers/getUserNameFromEmail';

import styles from './styles.module.css';

function SwitchMail({
	userEmailAddress = '',
}) {
	const { shortName: activePersonName } = getUserNameFromEmail({ query: userEmailAddress });

	return (
		<div className={styles.container}>
			<div className={styles.active_mail}>
				<Avatar
					size="50px"
					personName={activePersonName}
				/>
				<div className={cl`${styles.mail_address_container} 
						${styles.align_the_elements_center}`}
				>
					<div className={styles.user_name}>
						{activePersonName}
					</div>
					<div className={styles.mail_address}>
						{userEmailAddress}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SwitchMail;
