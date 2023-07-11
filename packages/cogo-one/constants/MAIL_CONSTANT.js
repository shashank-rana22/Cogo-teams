export const MAIL_FOLDER_OPTIONS = {
	inbox : 'Inbox',
	draft : 'Drafts',
	sent  : 'Sent Items',
	spam  : 'Junk Email',
};

export const DEFAULT_LIST_MAILS_TIMEOUT = 300000;

export const EMAIL_TAGS_COLOR = {
	toUserEmail: {
		bgColor  : '#FEF199',
		subDiv   : '#FFFCE6',
		crossDiv : '#FEF199',
	},
	ccrecipients: {
		bgColor  : '#CFEAED',
		subDiv   : '#F3FAFA',
		crossDiv : '#CFEAED',
	},
	bccrecipients: {
		bgColor  : '#CFEAED',
		subDiv   : '#F3FAFA',
		crossDiv : '#CFEAED',
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
