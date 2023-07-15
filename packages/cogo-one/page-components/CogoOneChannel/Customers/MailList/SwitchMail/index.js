import { Avatar, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { getUserActiveMails } from '../../../../../configurations/mail-configuration';

import styles from './styles.module.css';

function SwitchMail({
	viewType = '',
	userEmailAddress = '',
	activeMailAddress = '',
	setActiveMail = () => {},
	setShowPopover = () => {},
	setActiveMailAddress = () => {},
}) {
	const userActiveMails = getUserActiveMails({ viewType, userEmailAddress });

	const filteredMails = userActiveMails.filter((itm) => (itm !== activeMailAddress));

	const activePersonName = activeMailAddress.split('@')[GLOBAL_CONSTANTS.zeroth_index].replace('.', ' ');

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
						{activeMailAddress}
					</div>
				</div>
			</div>

			{filteredMails.map(
				(itm) => {
					const currentPersonName = itm.split('@')[GLOBAL_CONSTANTS.zeroth_index].replace('.', ' ');

					return (
						<div
							key={itm}
							role="presentation"
							onClick={() => {
								setActiveMailAddress(itm);
								setShowPopover(false);
								setActiveMail({});
							}}
							className={styles.mail_container}
						>
							<Avatar
								size="45px"
								personName={currentPersonName}
							/>
							<div className={styles.mail_address_container}>
								<div className={styles.user_name}>
									{currentPersonName}
								</div>
								<div className={styles.mail_address}>
									{itm}
								</div>
							</div>
						</div>
					);
				},
			)}
		</div>
	);
}

export default SwitchMail;
