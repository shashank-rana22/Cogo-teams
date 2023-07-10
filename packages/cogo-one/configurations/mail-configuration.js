import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDocument, IcMSend } from '@cogoport/icons-react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

export const GMAIL_OPTIONS_CONFIG = [
	{
		label : 'Inbox',
		value : 'inbox',
		icon  : <img
			src={GLOBAL_CONSTANTS.image_url.inbox_icon}
			alt="inbox"
		/>,
	},
	{
		label : 'Draft',
		value : 'draft',
		icon  : <IcMDocument fill="#BDBDBD" width={20} height={20} />,
	},
	{
		label : 'Sent',
		value : 'sent',
		icon  : <IcMSend fill="#BDBDBD" width={20} height={20} />,
	},
	{
		label : 'Spam',
		value : 'spam',
		icon  : <img
			src={GLOBAL_CONSTANTS.image_url.email_spam_icon}
			alt="spam"
		/>,
	},
];

export const getUserActiveMails = ({ userEmailAddress, viewType }) => {
	const mailsToBeShown = VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.mails_to_be_shown;

	return [
		userEmailAddress,
		...mailsToBeShown,
	];
};
