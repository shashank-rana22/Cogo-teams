import { Avatar, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { getUserActiveMails } from '../../../../../configurations/mail-configuration';

import styles from './styles.module.css';

function SwitchMail({
	viewType = '',
	userEmailAddress = '',
	activeMailAddress = '',
	setActiveMailAddress = () => {},
	setShowPopover = () => {},
}) {
	const userActiveMails = getUserActiveMails({ viewType, userEmailAddress });

	return (
		<div className={styles.container}>
			{userActiveMails.map(
				(itm) => (
					<div
						key={itm}
						role="presentation"
						onClick={() => {
							setActiveMailAddress(itm);
							setShowPopover(false);
						}}
						className={cl`${styles.mail_container} ${itm === activeMailAddress
							? styles.active_mail
							: ''}`}
					>
						<Avatar
							size="45px"
							personName={itm.split('@')[GLOBAL_CONSTANTS.zeroth_index].replace('.', ' ')}
						/>
						<div className={styles.mail_address_container}>
							<div className={styles.user_name}>
								{itm.split('@')[GLOBAL_CONSTANTS.zeroth_index].replace('.', ' ')}
							</div>
							<div className={styles.mail_address}>
								{itm}
							</div>
						</div>
					</div>
				),
			)}
		</div>
	);
}

export default SwitchMail;
