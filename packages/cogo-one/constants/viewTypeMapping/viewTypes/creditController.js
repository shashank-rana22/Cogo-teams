import { merge } from '@cogoport/utils';

import DEFAULT from './default';

const CREDIT_CONTROLLER = merge(DEFAULT, { chat_tabs_to_be_shown: ['firebase_emails'] });

export default CREDIT_CONTROLLER;
