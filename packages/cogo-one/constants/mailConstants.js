import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

export const SEARCH_QUERY_LIMIT = 50;

export const MAIL_FOLDER_OPTIONS = {
	inbox      : 'Inbox',
	draft      : 'Drafts',
	sent_items : 'Sent Items',
	spam       : 'Junk Email',
};

export const DEFAULT_LIST_MAILS_TIMEOUT = 300000;

export const EMAIL_TAGS_COLOR = {
	toUserEmail: {
		bgColor       : '#FEF199',
		subDivBgColor : '#FFFCE6',
	},
	ccrecipients: {
		bgColor       : '#CFEAED',
		subDivBgColor : '#F3FAFA',
	},
	bccrecipients: {
		bgColor       : '#FBD1A6',
		subDivBgColor : '#FEF3E9',
	},
};

export const DEFAULT_EMAIL_STATE = {
	subject       : '',
	body          : '',
	from_mail     : '',
	toUserEmail   : [],
	ccrecipients  : [],
	bccrecipients : [],
};

export const BUTTON_MAPPING = [
	{
		buttonName : 'Reply',
		icon       : <Image
			src={GLOBAL_CONSTANTS.image_url.reply}
			alt="reply icon"
			width={20}
			height={20}
		/>,
		key: 'reply',
	},
	{
		buttonName : 'Reply All',
		icon       : <Image
			src={GLOBAL_CONSTANTS.image_url.reply_all}
			alt="reply all icon"
			width={20}
			height={20}
		/>,
		key: 'reply_all',

	},
	{
		buttonName : 'Forward',
		icon       : <Image
			src={GLOBAL_CONSTANTS.image_url.forward}
			alt="forward icon"
			width={20}
			height={20}
		/>,
		key: 'forward',
	},
];
