import { IcMDocument, IcMSend } from '@cogoport/icons-react';

export const gmailoptions = [
	{
		label : 'Inbox',
		value : 'inbox',
		icon  : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/draft.svg"
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
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/spam.svg"
			alt="spam"
		/>,
	},
];
