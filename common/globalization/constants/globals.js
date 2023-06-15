import ENTITY_MAPPING from './entityMapping';
import LANGUAGE_OPTIONS from './languageMapping';

const GLOBAL_CONSTANTS = {
	country_entity_ids: {
		IN : '6fd98605-9d5d-479d-9fac-cf905d292b88',
		VN : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
	},
	platform_supported_country_codes: ['IN', 'VN'],

	currency_code: {
		INR : 'INR',
		USD : 'USD',
		EUR : 'EUR',
		GBP : 'GBP',
		AED : 'AED',
		VND : 'VND',
		HKD : 'HKD',
		JPY : 'JPY',
		SGD : 'SGD',
		CAD : 'CAD',
	},
	currency_locale: {
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
	sample_document_url: {
		new_hire_bulk_upload_url: `https://cogoport-production.sgp1.digitaloceanspaces.com
		/ab3309b85b52e198b4c2bb691a7fb609/new_employee_bulk_upload_sample_sheet.csv`,
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
		cogo_course_notification_user_ids: [
			'97dcd57c-d263-496f-9f59-7a7aef400d34',
			'20f59087-12cf-4e6d-8463-27d41e23da6f',
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
		empty_state               : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man',
		empty_port                : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-chat.jpg',
		empty_chart:
		'https://cogoport-testing.sgp1.digitaloceanspaces.com/e3d9b8569d67ea2cfe336581fd4d7c14/empty_3.svg',
		empty_customer_card : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-state-file.svg',
		email_svg           : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/email.svg',
		platform_chat_svg   : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/platformchat.svg',
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
		destination_icon    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/destination-icon.svg',
		document_icon_png   : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 180.png',
		day_one_png         : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 181.png',
		books_png           : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 182.png',
		map_png             : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 183.png',
		nodata_image       	: 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-empty-doc.svg',
	},
	options: {
		upload_file_size: {
			'1MB'  : '1048576',
			'5MB'  : '5242880',
			'15MB' : '15728640',
		},

		role_options: [
			{ value: 'software_development_engineer_1', label: 'Software Development Engineer - I' },
			{ value: 'business_analyst', label: 'Business Analyst' },
			{ value: 'product_analyst', label: 'Product Analyst' },
			{ value: 'business_consultant', label: 'Business Consultant' },
		],
	},

	regex_patterns: {
		number          : /^[+-]?\d*\.?\d+$/,
		email           : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
		pan_number      : /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g,
		aadhar_number   : /^[1-9]{1}[0-9]{11}$/g,
		passport_number : /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/,
		ifsc_code       : /^[A-Za-z]{4}\d{7}$/,
	},

	languages                       : LANGUAGE_OPTIONS,
	currency_conversion_constant    : 0.04,
	restricted_country_id_invoicing : ['b67d40b1-616c-4471-b77b-de52b4c9f2ff'],
	invoice_check_id                : 120347,
	shipment_types                  : [
		{ value: 'fcl_freight', label: 'FCL' },
		{ value: 'lcl_freight', label: 'LCL' },
		{ value: 'air_freight', label: 'AIR' },
		{ value: 'trailer_freight', label: 'Container Transportation' },
		{ value: 'ftl_freight', label: 'FTL' },
		{ value: 'ltl_freight', label: 'LTL' },
		{ value: 'haulage_freight', label: 'Rail Haulage' },
		{ value: 'fcl_customs', label: 'FCL Customs' },
		{ value: 'lcl_customs', label: 'LCL Customs' },
		{ value: 'air_customs', label: 'AIR Customs' },
		{ value: 'fcl_freight_local', label: 'FCL Freight Local' },
	],
	zeroth_index: 0,
};

GLOBAL_CONSTANTS.INVOICE_CURRENCY_MAPPINGS = {
	freight_invoice_currency: {
		IN: [
			GLOBAL_CONSTANTS.currency_code.INR,
			GLOBAL_CONSTANTS.currency_code.USD,
		],
		GB: [
			GLOBAL_CONSTANTS.currency_code.GBP,
			GLOBAL_CONSTANTS.currency_code.EUR,
			GLOBAL_CONSTANTS.currency_code.USD,
		],
		VN: [
			GLOBAL_CONSTANTS.currency_code.USD,
			GLOBAL_CONSTANTS.currency_code.VND,
		],
		others: [
			GLOBAL_CONSTANTS.currency_code.USD,
			GLOBAL_CONSTANTS.currency_code.EUR,
			GLOBAL_CONSTANTS.currency_code.INR,
		],

	},

};

export default GLOBAL_CONSTANTS;
