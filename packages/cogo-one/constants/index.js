import {
	IcCWhatsapp, IcCFacebook, IcCInstagram,
	IcCLcl,
	IcCFcl,
	IcCAir,
	IcMFftl,
	IcMFltl,
} from '@cogoport/icons-react';

export const SOURCE_ICON_MAPPING = {
	whatsapp  : <IcCWhatsapp width={20} height={20} />,
	facebook  : <IcCFacebook width={20} height={20} />,
	instagram : <IcCInstagram width={20} height={20} />,
	email     : <img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/email.svg"
		alt=""
		width="16px"
		height="16px"
	/>,
	platform_chat: <img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/platformchat.svg"
		alt=""
		width="16px"
		height="16px"
	/>,
	platform_notification: <img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/platformnotification.svg"
		alt=""
		width="22px"
		height="22px"
	/>,

};

export const TAGS_COLORS = ['#FEF3E9', '#F3FAFA'];

export const ASSIGNE_COLORS = {
	disabled  : { background: '#BDBDBD', shadowColor: '#E0E0E0', color: '#ffffff' },
	active    : { background: '#C4DC91', shadowColor: '#DDEBC0', color: '#221F20' },
	spectator : { background: '#F9AE64', shadowColor: '#FBD1A6', color: '#221F20' },
};

export const VOICE_ICON_MAPPING = {
	missed        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/misscall.svg',
	not_connected : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/disconnected.svg',
	outgoing      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/outgoingcall.svg',
	incoming      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/incomingcall.svg',
};

export const USER_ACTIVITY_MAPPING = {
	platform      : 'Platform Activity',
	communication : 'Communication Activity',
	transactional : 'Transactional Activity',
};

export const emptyChat = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-chat.jpg';

export const SERVICE = {
	fcl_freight     : 'FCL',
	lcl_freight     : 'LCL',
	ftl_freight     : 'FTL',
	ltl_freight     : 'LTL',
	air_freight     : 'AIR',
	haulage_freight : 'HAU',
};

export const SERVICE_ICON_MAPPING = {
	fcl_freight : <IcCFcl width={18} height={18} />,
	lcl_freight : <IcCLcl />,
	air_freight : <IcCAir />,
	ftl_freight : <IcMFftl />,
	ltl_freight : <IcMFltl />,
};

export const LOGO_URL = {
	admin : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/10118f395f681ff8ce69dc191c28d45d/XMLID_816_.svg',
	bot   : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-icon-notification.svg',
};

export const OFFLINE_STATUS_OPTIONS = [
	{
		label : '1 hour',
		value : '1_hour',
	},
	{
		label : '4 hours',
		value : '4_hour',
	},
	{
		label : 'Today',
		value : 'today',
	},
	{
		label : 'This week',
		value : 'this_week',
	},
	{
		label : 'Custom',
		value : 'custom',
	},
];

export const PLATFORM_MAPPING = {
	public_website : 'Website',
	public_cp      : 'CP Platform',
	public_app     : 'App Platform',
};

// eslint-disable-next-line max-len
export const URL_MATCH_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export const DEFAULT_PILLS_ITEMS = [
	{
		label : 'Introductory',
		value : 'introductory',
	},
	{
		label : 'Sales',
		value : 'sales',
	},
	{
		label : 'Rate enquiry',
		value : 'rate_enquiry',
	},
	{
		label : 'Payment recovery',
		value : 'payment_recovery',
	},
	{
		label : 'Other',
		value : 'other',
	},
];
export const statusMapping = {
	approved : 'Approved',
	rejected : 'Rejected',
	null     : 'Pending',

};

export const statusColorMapping = {
	approved : 'green',
	rejected : 'red',
	null     : 'orange',

};

export const PLACEHOLDER_MAPPING = {
	shipment_id    : 'Select SID',
	invoice        : 'Enter Invoice No',
	onboarding_kyc : 'Enter Pan No',
};
