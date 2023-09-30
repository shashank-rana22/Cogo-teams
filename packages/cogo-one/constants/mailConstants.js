import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEdit, IcMAppDelete } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

export const SEARCH_QUERY_LIMIT = 50;

export const HEADER_MAPPING = {
	send_mail : 'New Mail',
	forward   : 'Forward Mail',
	reply_all : 'Reply All',
	reply     : 'Reply',
	email     : 'Choose Template',
};

export const MAIL_FOLDER_OPTIONS = {
	inbox      : 'Inbox',
	drafts     : 'Drafts',
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
	orgId         : '',
	rteContent    : '',
	customSubject : {
		activeTab   : 'shipment',
		serialId    : '',
		subjectText : '',
	},
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
	{
		buttonName : 'Preview',
		icon       : <IcMEdit
			width={20}
			height={20}
		/>,
		key: 'preview',
	},
	{
		buttonName : 'delete',
		icon       : (<IcMAppDelete
			width={20}
			height={20}
		/>),
		key: 'delete',
	},
];

export const BUTTON_KEYS_MAPPING = {
	draft : ['preview', 'delete'],
	mail  : ['forward', 'reply', 'reply_all'],
};

export const SUBJECT_MAPPING = {
	shipment: {
		title         : 'SIDs',
		value         : 'shipment',
		preText       : 'SID:',
		template_tags : ['shipments_rpa'],
	},
	quotation: {
		title         : 'Quotations',
		value         : 'quotation',
		preText       : 'Quotation ID:',
		template_tags : ['quotation_rpa'],
	},
	custom: {
		title         : 'Others',
		value         : 'custom',
		preText       : '',
		template_tags : ['custom_rpa'],
	},
};
