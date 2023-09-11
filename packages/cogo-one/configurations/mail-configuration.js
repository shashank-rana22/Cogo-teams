import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDocument, IcMSend, IcMEmail } from '@cogoport/icons-react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

export const GMAIL_OPTIONS_CONFIG = [
	{
		label       : 'Inbox',
		value       : 'inbox',
		allowedTabs : ['outlook', 'firebase_emails'],
		image       : GLOBAL_CONSTANTS.image_url.inbox_icon,
		hoverImage  : GLOBAL_CONSTANTS.image_url.email_inbox_icon,
	},
	{
		label       : 'Drafts',
		value       : 'drafts',
		allowedTabs : ['outlook', 'firebase_emails'],
		icon        : <IcMDocument
			fill="#BDBDBD"
			height={24}
			width={24}
		/>,
	},
	{
		label       : 'Sent',
		value       : 'sent_items',
		allowedTabs : ['outlook', 'firebase_emails'],
		icon        : <IcMSend
			fill="#BDBDBD"
			height={24}
			width={24}
		/>,
	},
	{
		label       : 'Spam',
		value       : 'spam',
		allowedTabs : ['outlook'],
		image       : GLOBAL_CONSTANTS.image_url.email_spam_icon,
		hoverImage  : GLOBAL_CONSTANTS.image_url.spam_flag_icon,
	},
	{
		label       : 'All',
		value       : 'all_mails',
		allowedTabs : ['firebase_emails'],
		icon        : <IcMEmail
			fill="#BDBDBD"
			height={24}
			width={24}
		/>,
	},
];

export const getUserActiveMails = ({ userEmailAddress, viewType }) => {
	const mailsToBeShown = VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.mails_to_be_shown || [];

	return [
		userEmailAddress,
		...(mailsToBeShown || []),
	];
};
