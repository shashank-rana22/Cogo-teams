import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDocument, IcMSend } from '@cogoport/icons-react';

export const GMAIL_OPTIONS_CONFIG = [
	{
		label      : 'Inbox',
		value      : 'inbox',
		image      : GLOBAL_CONSTANTS.image_url.inbox_icon,
		hoverImage : GLOBAL_CONSTANTS.image_url.email_inbox_icon,
	},
	{
		label : 'Draft',
		value : 'draft',
		icon  : <IcMDocument
			fill="#BDBDBD"
			height={24}
			width={24}
		/>,
	},
	{
		label : 'Sent',
		value : 'sent',
		icon  : <IcMSend
			fill="#BDBDBD"
			height={24}
			width={24}
		/>,
	},
	{
		label      : 'Spam',
		value      : 'spam',
		image      : GLOBAL_CONSTANTS.image_url.email_spam_icon,
		hoverImage : GLOBAL_CONSTANTS.image_url.spam_flag_icon,
	},
];
