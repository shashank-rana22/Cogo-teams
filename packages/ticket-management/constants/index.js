export const getTicketStatus = (val) => {
	if (
		['unresolved', 'reject_requested', 'resolve_requested'].includes(
			val,
		)
	) {
		return 'open';
	}
	if (val === 'overdue') {
		return 'closed';
	}
	return val;
};

export const BOT_ICON =	'https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/web_bot';

export const MATCH_IMAGE_EXTENSION = /\.(jpg|jpeg|png|gif|svg)$/i;

export const actionButtonKeys = ({
	unresolved: {
		label : 'Resolve',
		name  : 'resolve',
	},
	pending: {
		label : 'Resolve',
		name  : 'resolve',
	},
	escalated: {
		label : 'Resolve',
		name  : 'resolve',
	},
	closed: {
		label : 'Reopen',
		name  : 'reopen',
	},
});

export const TICKET_OPEN_STATUS = [
	'unresolved',
	'pending',
	'reject_requested',
	'resolve_requested',
];

// eslint-disable-next-line max-len
export const URL_MATCH_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export const MESSAGE_MAPPING = {
	text    : ['text', 'template', 'interactive'],
	media   : ['image', 'audio', 'video'],
	contact : ['contact'],
};

// eslint-disable-next-line max-len
export const DOCUMENT_ICON = 'https://cogoport-production.sgp1.digitaloceanspaces.com/e2ae10b0c4ea7320fa4ce75f0ea12b4c/Vector%20%284%29.svg';
