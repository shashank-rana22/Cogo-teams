import CURRENCY_CODE from './currencyCode';
import ENTITY_MAPPING from './entityMapping';
import LANGUAGE_OPTIONS from './languageMapping';

const GLOBAL_CONSTANTS = {
	country_entity_ids: {
		IN : '6fd98605-9d5d-479d-9fac-cf905d292b88',
		VN : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
	},
	platform_supported_country_codes: ['IN', 'VN'],

	currency_code   : CURRENCY_CODE,
	currency_locale : {
		INR : 'en-IN',
		USD : 'en-US',
		VND : 'vi-VN',
		AED : 'en-AE',
	},
	currency_symbol: {
		USD : '$',
		INR : '₹',
		VND : '₫',
		AED : 'AED',
	},
	formats: {
		date: {
			'dd/MM/yyyy'        : 'dd/MM/yyyy',
			'dd MMM yyyy'       : 'dd MMM yyyy',
			'dd MMMM yyyy'      : 'dd MMMM yyyy',
			'eee, dd MMM, yyyy' : 'eee, dd MMM, yyyy',
			'yyyy-MM-dd'        : 'yyyy-MM-dd',
		},
		time: {
			'hh:mm aaa' : 'hh:mm aaa',
			'HH:mm'     : 'HH:mm',
			'hh:mm:ss'  : 'hh:mm:ss',
			hh          : 'hh',
			HH          : 'HH',
			mm          : 'mm',
			a           : 'a',
		},
	},
	payment_url: {
		razer_pay_url: 'https://checkout.razorpay.com/v1/checkout.js',
	},
	flash_booking_charge_codes: [
		'OTC',
		'BAS',
		'AGC',
		'STC',
		'IHC',
		'CFS',
		'DOC',
		'DAF',
		'ICDS',
		'DSC',
		'PDPDC',
		'SLC',
		'RENC',
		'DS',
		'DDS',
		'ICDDS',
		'T1',
		'IHE',
		'IHI',
		'CCD',
		'CCO',
		'RTC',
	],
	uuid: {
		amitabh_user_id        : 'cd8dde11-678c-4467-85b2-2e2d6055bef4',
		superadmin_id          : '5de782f6-f59d-41fc-84f4-8425dc1fa670',
		tech_superadmin_id     : '381b9d1d-e005-4cc0-9844-a5f1636e71b1',
		cogoacademy_admin_id   : '13cb3b79-95c2-49ca-9ebd-8c3ee1996981',
		sagar_bankar_user_id   : 'd7d62f21-c148-4f7c-9aa1-d916897aed91',
		ajeet_singh_user_id    : '4bafde92-a30f-44d3-ace4-584dd460143e',
		local_charge_providers : {
			IN : '5dc403b3-c1bd-4871-b8bd-35543aaadb36',
			GB : '5eef8dfe-c485-414a-bbcb-82a8388539e3',
			UK : '5eef8dfe-c485-414a-bbcb-82a8388539e3',
		},
		third_party_enrichment_agencies_role_ids : ['38d20d88-e987-4b65-a9ad-c41dd134845b'],
		paramount_org_id                         : '1e4b9f43-4863-4e29-a944-8e9e8780e514',
		rfq_admin_ids                            : [
			'5de782f6-f59d-41fc-84f4-8425dc1fa670',
			'ebafce31-75ef-4865-9060-775574e9606f',
		],
	},
	view_key_mappings: {
		sales_team_members_view          : 'sales_agent_id',
		booking_team_members_view        : 'booking_agent_id',
		supply_team_members_view         : 'supply_agent_id',
		pi_approval_team_members_view    : 'pi_approval_agent_id',
		default                          : 'sales_agent_id',
		entity_manager_team_members_view : 'entity_manager_id',
		reporting_manager_view           : 'reporting_manager_id',
	},

	cogoport_entities: ENTITY_MAPPING,

	months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],

	image_url: {
		general_icon              : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/General.svg',
		eclamation_svg            : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/white_exclamation.svg',
		cart_png                  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cart_icon.png',
		saas_subscription_loading : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg',
		email_svg                 : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/email.svg',
		platform_chat_svg         : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/platformchat.svg',
		platform_notification_svg:
			'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/platformnotification.svg',
		missed_call_svg     : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/misscall.svg',
		not_connected_svg   : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/disconnected.svg',
		outgoing_svg        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/outgoingcall.svg',
		incoming_svg        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/incomingcall.svg',
		empty_chat_jpg      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-chat.jpg',
		admin_logo_svg      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/admin_icon.svg',
		bot_logo_svg        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-icon-notification.svg',
		reply_icon_png      : 'https://cdn-icons-png.flaticon.com/512/1933/1933011.png',
		reply_all_icon_png  : 'https://cdn-icons-png.flaticon.com/512/747/747334.png',
		forward_icon_png    : 'https://cdn-icons-png.flaticon.com/512/60/60546.png',
		incoming_green_svg  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/incoming-call-green.png',
		outgoing_orange_svg : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/outgoing-call-orange.png',
		missed_call_red_svg : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/missed-call-red.png',

	},

	features: {
		freight_sales_invoice: {
			restricted_entity_ids: [ENTITY_MAPPING[501].id],
		},
	},

	options: {
		upload_file_size: {
			'1MB'  : '1048576',
			'5MB'  : '5242880',
			'15MB' : '15728640',
		},
		freight_invoice_currency: {
			IN     : [CURRENCY_CODE.INR, CURRENCY_CODE.USD],
			GB     : [CURRENCY_CODE.GBP, CURRENCY_CODE.EUR, CURRENCY_CODE.USD],
			VN     : [CURRENCY_CODE.USD, CURRENCY_CODE.VND],
			OTHERS : [CURRENCY_CODE.USD, CURRENCY_CODE.EUR, CURRENCY_CODE.INR],
		},
		inco_term: {
			cif: {
				trade_type: 'export',
			},
			cfr: {
				trade_type: 'export',
			},
			cpt: {
				trade_type: 'export',
			},
			cip: {
				trade_type: 'export',
			},
			dat: {
				trade_type: 'export',
			},
			dap: {
				trade_type: 'export',
			},
			ddp: {
				trade_type: 'export',
			},
			fob: {
				trade_type: 'import',
			},
			exw: {
				trade_type: 'import',
			},
			fca: {
				trade_type: 'import',
			},
			fas: {
				trade_type: 'import',
			},
		},
	},

	regex_patterns: {
		number: /^[+-]?\d*\.?\d+$/,
	},

	languages: LANGUAGE_OPTIONS,

	others: {
		old_shipment_serial_id: 120347,
	},

};

export default GLOBAL_CONSTANTS;
