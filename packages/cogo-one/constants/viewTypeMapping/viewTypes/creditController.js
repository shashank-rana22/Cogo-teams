import { merge } from '@cogoport/utils';

import DEFAULT from './default';

const CREDIT_CONTROLLER = merge(DEFAULT, {
	show_relevant_templates : ['quick_reply', 'credit_controller'],
	chat_tabs_to_be_shown   : ['firebase_emails', 'teams'],
	permissions             : {
		hide_personal_mail: true,
	},
});

export default CREDIT_CONTROLLER;
