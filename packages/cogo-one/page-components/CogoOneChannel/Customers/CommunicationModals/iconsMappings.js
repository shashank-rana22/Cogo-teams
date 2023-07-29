import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAppPoc, IcMAppAddAccount } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function CallIcon({ onClick = () => {} }) {
	return (
		<div className={styles.call_icon_styles}>
			<Image
				onClick={onClick}
				src={GLOBAL_CONSTANTS.image_url.call_icon}
				alt="call icon"
				role="presentation"
				height={60}
				width={60}
			/>
		</div>
	);
}

function WhastappIcon({ onClick = () => {} }) {
	return (
		<div>
			<Image
				onClick={onClick}
				src={GLOBAL_CONSTANTS.image_url.whatsapp_icon}
				alt="whatsapp icon"
				role="presentation"
				height={60}
				width={60}
			/>
		</div>
	);
}

function MailIcon({ onClick = () => {} }) {
	return (
		<div className={styles.mail_icon_styles}>
			<Image
				onClick={onClick}
				src={GLOBAL_CONSTANTS.image_url.email_icon}
				alt="gmail icon"
				role="presentation"
				height={60}
				width={60}
			/>
		</div>
	);
}

function ContactsIcon({ onClick = () => {} }) {
	return (
		<div className={styles.common_contact_icon_styles}>
			<IcMAppPoc
				onClick={onClick}
				height={25}
				width={25}
				fill="#432609"
			/>
		</div>
	);
}

function SpContacts({ onClick = () => {} }) {
	return (
		<div className={cl`${styles.common_contact_icon_styles} ${styles.sp_contacts_icon}`}>
			<IcMAppAddAccount
				onClick={onClick}
				height={25}
				width={25}
				fill="#432609"
			/>
		</div>
	);
}
export const ICONS_MAPPING = {
	new_call        : CallIcon,
	new_whatsapp    : WhastappIcon,
	new_mail        : MailIcon,
	global_contacts : ContactsIcon,
	sp_contacts     : SpContacts,
};
