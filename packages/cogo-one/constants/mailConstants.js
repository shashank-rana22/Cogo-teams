export const MAIL_FOLDER_OPTIONS = {
	inbox : 'Inbox',
	draft : 'Drafts',
	sent  : 'Sent Items',
	spam  : 'Junk Email',
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
