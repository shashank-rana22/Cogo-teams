import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcCWhatsapp, IcCFacebook, IcCInstagram,
	IcCLcl,
	IcCFcl,
	IcCAir,
	IcMFftl,
	IcMFltl, IcCTelegram, IcCZalo,
} from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

export const SOURCE_ICON_MAPPING = {
	whatsapp  : <IcCWhatsapp width={25} height={25} />,
	facebook  : <IcCFacebook width={25} height={25} />,
	instagram : <IcCInstagram width={25} height={25} />,
	telegram  : <IcCTelegram width={25} height={25} />,
	zalo      : <IcCZalo width={25} height={25} />,
	email     : <img
		src={GLOBAL_CONSTANTS.image_url.email_svg}
		alt="email_svg"
		width="18px"
		height="18px"
	/>,
	platform_chat: <img
		src={GLOBAL_CONSTANTS.image_url.platform_chat_svg}
		alt="platform_chat_svg"
		width="18px"
		height="18px"
	/>,
	platform_notification: <img
		src={GLOBAL_CONSTANTS.image_url.platform_notification_svg}
		alt="platform_notification_svg"
		width="30px"
		height="30px"
	/>,
	user: <Image
		src={GLOBAL_CONSTANTS.image_url.login_failed}
		alt="status-icon"
		width={18}
		height={18}
	/>,
	checkout: <Image
		src={GLOBAL_CONSTANTS.image_url.checkout_failed}
		alt="status-icon"
		width={20}
		height={20}
	/>,
	communication: <Image
		src={GLOBAL_CONSTANTS.image_url.email_clicked}
		alt="status-icon"
		width={20}
		height={20}
	/>,
	shipment: <Image
		src={GLOBAL_CONSTANTS.image_url.abandon_shipmemts}
		alt="status-icon"
		width={20}
		height={20}
	/>,
	spot_search: <Image
		src={GLOBAL_CONSTANTS.image_url.checkout_failed}
		alt="status-icon"
		width={20}
		height={20}
	/>,
	lead_user: <Image
		src={GLOBAL_CONSTANTS.image_url.sign_up_failed}
		alt="status-icon"
		width={20}
		height={20}
	/>,
	organization: <Image
		src={GLOBAL_CONSTANTS.image_url.kyc_event}
		alt="status-icon"
		width={20}
		height={20}
	/>,
};

export const TAGS_COLORS = ['#FEF3E9', '#F3FAFA'];

export const ASSIGNE_COLORS = {
	disabled  : { background: '#BDBDBD', shadowColor: '#E0E0E0', color: '#ffffff' },
	active    : { background: '#C4DC91', shadowColor: '#DDEBC0', color: '#221F20' },
	spectator : { background: '#F9AE64', shadowColor: '#FBD1A6', color: '#221F20' },
};

export const VOICE_ICON_MAPPING = {
	missed        : GLOBAL_CONSTANTS.image_url.missed_call_svg,
	not_connected : GLOBAL_CONSTANTS.image_url.not_connected_svg,
	outgoing      : GLOBAL_CONSTANTS.image_url.outgoing_svg,
	incoming      : GLOBAL_CONSTANTS.image_url.incoming_svg,
};

export const USER_ACTIVITY_MAPPING = {
	platform      : 'Platform Activity',
	communication : 'Communication Activity',
	transactional : 'Transactional Activity',
	summary       : 'Summary',
};

export const emptyChat = GLOBAL_CONSTANTS.image_url.empty_chat_jpg;

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
	admin : GLOBAL_CONSTANTS.image_url.admin_logo_svg,
	bot   : GLOBAL_CONSTANTS.image_url.bot_logo_svg,
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

export const URL_MATCH_REGEX = GLOBAL_CONSTANTS.regex_patterns.url_match_regex;
export const ENDS_WITH_STAR_SPACE = GLOBAL_CONSTANTS.regex_patterns.ends_with_star_space;
export const ENDS_WITH_STAR_CHAR = GLOBAL_CONSTANTS.regex_patterns.ends_with_star_char;

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

export const STATUS_MAPPING = {
	approved : { label: 'Approved', color: 'green' },
	rejected : { label: 'Rejected', color: 'red' },
	pending  : { label: 'Pending', color: 'orange' },

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
		label : 'KYC Document',
		value : 'kyc_document',
	},
	{
		label : 'Shipment Document',
		value : 'shipment_document',
	},
	{
		label : 'Wrong Document',
		value : 'wrong_document',
	},
	{
		label : 'Document Uploaded',
		value : 'document_uploaded',
	},
	{
		label : 'Document Accepted',
		value : 'document_accepted',
	},
	{
		label : 'Document Rejected',
		value : 'document_rejected',
	},

];

export const ANDRIOD_APK = 'https://cogo-one-prod.s3.ap-south-1.amazonaws.com/cogoOne_prod.apk';

export const MAIL_REPLY_TYPE = [
	{
		label : 'Reply',
		value : 'reply',
		icon  : <img
			src={GLOBAL_CONSTANTS.image_url.reply_icon_png}
			alt="reply icon"
		/>,
	},
	{
		label : 'Reply All',
		value : 'reply_all',
		icon  : <img
			src={GLOBAL_CONSTANTS.image_url.reply_all_icon_png}
			alt="reply all icon"
		/>,
	},
	{
		label : 'Forward',
		value : 'forward',
		icon  : <img
			src={GLOBAL_CONSTANTS.image_url.forward_icon_png}
			alt="forward icon"
		/>,
	},
];
export const PAGE_LIMIT = 50;

export const FILTER_KEYS_MAPPING = {
	requested  : { Statuses: 'reject_requested,resolve_requested,pending' },
	unresolved : { Statuses: 'unresolved,escalated' },
	closed     : { Statuses: 'closed,overdue' },
};

export const PRIORITY_MAPPING = {
	medium : '#F68B21',
	high   : '#EE3425',
	low    : '#FCDC00',
};

export const ICON_MAPPING = {
	incoming : GLOBAL_CONSTANTS.image_url.incoming_green_svg,
	outgoing : GLOBAL_CONSTANTS.image_url.outgoing_orange_svg,
	missed   : GLOBAL_CONSTANTS.image_url.missed_call_red_svg,
};

export const STRING_TO_ARRAY_REGEX = GLOBAL_CONSTANTS.regex_patterns.string_to_array;

export const API_MAPPING = {
	whatsapp      : '/create_communication',
	platform_chat : '/create_communication_platform_chat',
	telegram      : '/create_communication',
	zalo          : '/create_communication',
};

export const ACCEPT_FILE_MAPPING = {
	default : '.png, .pdf, .jpg, .jpeg, .doc, .docx, .csv, .svg, .gif, .mp4, .xlsx',
	zalo    : '.png, .pdf, .jpg, .jpeg, .csv, .svg',
};

export const MAX_WEIGHT_SLAB = 500;

export const OFFLINE_REASONS_OPTIONS = [
	{
		label : 'Lunch Break',
		value : 'lunch_break',
	},
	{
		label : 'Snack Break',
		value : 'snack_break',
	},
	{
		label : 'Others',
		value : 'others',
	},
];
