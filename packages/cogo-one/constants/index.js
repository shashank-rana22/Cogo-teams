import {
	IcCWhatsapp, IcCFacebook, IcCInstagram,
	IcCLcl,
	IcCFcl,
	IcCAir,
	IcMFftl,
	IcMFltl,
} from '@cogoport/icons-react';

export const SOURCE_ICON_MAPPING = {
	whatsapp  : <IcCWhatsapp width={25} height={25} />,
	facebook  : <IcCFacebook width={25} height={25} />,
	instagram : <IcCInstagram width={25} height={25} />,
	email     : <img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/email.svg"
		alt=""
		width="18px"
		height="18px"
	/>,
	platform_chat: <img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/platformchat.svg"
		alt=""
		width="18px"
		height="18px"
	/>,
	platform_notification: <img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/platformnotification.svg"
		alt=""
		width="30px"
		height="30px"
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

export const DISLIKE_OPTIONS = [
	{
		label : 'Question not satisfactory',
		value : 'Question not satisfactory',
	},
	{
		label : 'Answer not satisfactory',
		value : 'Answer not satisfactory',
	},
];

export const FEEDBACK_MAPPING = {
	true  : 'liked',
	false : 'disliked',
};

export const ACCOUNT_TYPE = {
	importer_exporter : 'Importer/Exporter',
	service_provider  : 'Service Provider',
};

export const TOOLBARCONFIG = {
	display: [
		'INLINE_STYLE_BUTTONS',
		'BLOCK_TYPE_BUTTONS',
		'LINK_BUTTONS',
		'BLOCK_TYPE_DROPDOWN',
		'HISTORY_BUTTONS',
	],
	INLINE_STYLE_BUTTONS: [
		{ label: 'Bold', style: 'BOLD', className: 'custom_css_class' },
		{ label: 'Italic', style: 'ITALIC' },
		{ label: 'Underline', style: 'UNDERLINE' },
	],
	BLOCK_TYPE_DROPDOWN: [
		{ label: 'Normal', style: 'unstyled' },
		{ label: 'Heading Large', style: 'header-one' },
		{ label: 'Heading Medium', style: 'header-two' },
		{ label: 'Heading Small', style: 'header-three' },
	],
	BLOCK_TYPE_BUTTONS: [
		{ label: 'UL', style: 'unordered-list-item' },
		{ label: 'OL', style: 'ordered-list-item' },
	],
};

export const ACCOUNT_TYPE_MAPPING = {
	importer_exporter : 'twin_importer_exporter_id',
	service_provider  : 'twin_service_provider_id',
};

export const DOCUMENT_FILTERS_MAPPING = [
	{
		label : 'KYC document',
		value : 'kyc_document',
	},
	{
		label : 'Shipment document',
		value : 'shipment_document',
	},
	{
		label : 'Wrong document',
		value : 'wrong_document',
	},
];
