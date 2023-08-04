/* eslint-disable custom-eslint/email-check */
/* eslint-disable custom-eslint/img-src-cdn, custom-eslint/uuid-check,  custom-eslint/regex-check  */
import CURRENCY_CODE from './currencyCode';
import ENTITY_MAPPING from './entityMapping';
import LANGUAGE_OPTIONS from './languageMapping';

const GLOBAL_CONSTANTS = {
	attendence_options: [
		{ value: 'flexi_shift', label: 'Flexi Shift' },
		{ value: 'geo_location', label: 'Geolocation' },
	],
	li_options: [
		{ value: 'analyzer', label: 'Analyzer' },
		{ value: 'controller', label: 'Controller' },
		{ value: 'specialist', label: 'Specialist' },
		{ value: 'strategist', label: 'Strategist' },
		{ value: 'venturer', label: 'Venturer' },
		{ value: 'altruist', label: 'Altruist' },
		{ value: 'captain', label: 'Captain' },
		{ value: 'collaborator', label: 'Collaborator' },
		{ value: 'maverick', label: 'Maverick' },
		{ value: 'persuader', label: 'Persuader' },
		{ value: 'promoter', label: 'Promoter' },
		{ value: 'adapter', label: 'Adapter' },
		{ value: 'artisan', label: 'Artisan' },
		{ value: 'guardian', label: 'Guardian' },
		{ value: 'operator', label: 'Operator' },
		{ value: 'individualist', label: 'Individualist' },
		{ value: 'scholar', label: 'Scholar' },
	],
	department_options: [
		{ value: 'admin', label: 'Admin' },
		{ value: 'business_finance', label: 'Business Finance' },
		{ value: 'air_exports_bd', label: 'Air Exports BD' },
		{ value: 'channel_partner', label: 'Channel Partner' },
		{ value: 'design', label: 'Design' },
		{ value: 'enterprise_sales', label: 'Enterprise Sales' },
		{ value: 'experience_(COE)', label: 'Experience (COE)' },
		{ value: 'fintech', label: 'Fintech' },
		{ value: 'human_resources', label: 'Human Resources' },
		{ value: 'marketing', label: 'Marketing' },
		{ value: 'MM_business_development', label: 'MM Business Development' },
		{ value: 'process_excellence', label: 'Process Excellence' },
		{ value: 'product', label: 'Product' },
		{ value: 'rail_business_development', label: 'Rail business development' },
		{ value: 'SME_demand', label: 'SME Demand' },
		{ value: 'supply', label: 'Supply' },
		{ value: 'supply_management', label: 'Supply Management' },
		{ value: 'technology', label: 'Technology' },

	],
	country_entity_ids: {
		IN : '6fd98605-9d5d-479d-9fac-cf905d292b88',
		VN : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
	},
	country_ids: {
		IN : '541d1232-58ce-4d64-83d6-556a42209eb7',
		VN : '177fcbad-8ef7-4324-871c-6c31745f4411',
	},

	platform_supported_country_codes: ['IN', 'VN'],

	currency_code   : CURRENCY_CODE,
	currency_locale : {
		INR : 'en-IN',
		USD : 'en-US',
		VND : 'vi-VN',
		AED : 'en-AE',
		SGD : 'en-SG',

	},
	currency_symbol: {
		USD : '$',
		INR : '₹',
		VND : '₫',
		AED : 'AED',
		SGD : '$',

	},
	formats: {
		date: {
			'dd/MM/yyyy'        : 'dd/MM/yyyy',
			'dd MMM yyyy'       : 'dd MMM yyyy',
			'dd MMMM yyyy'      : 'dd MMMM yyyy',
			'eee, dd MMM, yyyy' : 'eee, dd MMM, yyyy',
			'yyyy-MM-dd'        : 'yyyy-MM-dd',
			'MMM yyyy'          : 'MMM yyyy',
			'dd MMM'            : 'dd MMM',
		},
		time: {
			'hh:mm aaa' : 'hh:mm aaa',
			'HH:mm'     : 'HH:mm',
			'hh:mm:ss'  : 'hh:mm:ss',
			'HH:mm:ss'  : 'HH:mm:ss',
			'HH:mm a'   : 'HH:mm a',
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
		new_hire_bulk_upload_url: `https://cogoport-production.sgp1.digitaloceanspaces.com/
						a3072d28df04315514414abe46a8c2f0/new_employee_bulk_upload_sample_sheet.csv`,
	},
	upload_utr_sample_file: {
		normal_payment: 'https://cogoport-testing.sgp1.digitaloceanspaces.com/06679b4fca57'
							+ 'a312ee8f3fe0ded72246/UTRuploadSampleFile.xlsx',
		advance_payment: 'https://cogoport-production.sgp1.digitaloceanspaces.com/0af71f459488aae5'
							+ '9e95d4e38a4271ff/UTRuploadSampleFileForAdvancePayment.xlsx',
	},
	flash_booking_charge_codes: [
		'OTC',
		'BAS',
		'BASNO',
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
		'DCG',
		'OE',
		'DSI',
		'TRCG',
		'EDI',
		'WNOC',
		'THCG',
		'COC',
		'FLC',
		'PDC',
		'ADCRC',
		'DO',
		'ACMES',
		'LBL',
		'LUC',
		'FC',
		'EC',
		'LR',
		'OCG',
		'DCG',
		'MLR',
		'WRC',
		'PLI',
		'WC',
		'WEH',
		'WHT',
		'IGT',
		'SAC',
		'PYC',
		'CTGC',
		'WRSC',
		'LRPC',
		'QDF',
		'PTC',
		'SUR',
		'BTT',
		'LC',
		'RPC',
		'WHC',
		'MIF',
		'LIDC',
		'NOCC',
		'HLC',
		'MCS',
		'ADDCH',
		'SORCH',
		'FCHC',
		'HAZL',
		'CECC',
		'MNLC',
		'ADSI',
		'CCOV',
	],
	uuid: {
		amitabh_user_id         : 'cd8dde11-678c-4467-85b2-2e2d6055bef4',
		superadmin_id           : '5de782f6-f59d-41fc-84f4-8425dc1fa670',
		tech_superadmin_id      : '381b9d1d-e005-4cc0-9844-a5f1636e71b1',
		cogoacademy_admin_id    : '13cb3b79-95c2-49ca-9ebd-8c3ee1996981',
		sagar_bankar_user_id    : 'd7d62f21-c148-4f7c-9aa1-d916897aed91',
		ajeet_singh_user_id     : '4bafde92-a30f-44d3-ace4-584dd460143e',
		hk_user_id              : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
		sachin_mehra_user_id    : '68c7e272-0c66-43a9-9537-eedb4e543194',
		vinod_talapa_user_id    : '6d713339-c528-4696-9f7b-c01f86887ac1',
		manoj_mahapatra_user_id : '7b1fc916-6984-4179-aee5-c23f9871085d',
		local_charge_providers  : {
			IN : '5dc403b3-c1bd-4871-b8bd-35543aaadb36',
			GB : '5eef8dfe-c485-414a-bbcb-82a8388539e3',
			UK : '5eef8dfe-c485-414a-bbcb-82a8388539e3',
		},
		paramount_org_id : '1e4b9f43-4863-4e29-a944-8e9e8780e514',
		rfq_admin_ids    : [
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
		missed_call_svg   : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/misscall.svg',
		start_user_audio  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/disabled call.svg',
		end_user_audio    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/call.svg',
		start_agent_audio : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/call hangup.svg',
		end_agent_audio   : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/omni_channel.svg',
		not_connected_svg : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/disconnected.svg',
		outgoing_svg      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/outgoingcall.svg',
		incoming_svg      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/incomingcall.svg',
		empty_chat_jpg    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-chat.jpg',
		admin_logo_svg    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/admin_icon.svg',
		bot_logo_svg:
		'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-icon-notification.svg',
		reply_icon_png         : 'https://cdn-icons-png.flaticon.com/512/1933/1933011.png',
		reply_all_icon_png     : 'https://cdn-icons-png.flaticon.com/512/747/747334.png',
		forward_icon_png       : 'https://cdn-icons-png.flaticon.com/512/60/60546.png',
		incoming_green_svg     : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/incoming-call-green.png',
		outgoing_orange_svg    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/outgoing-call-orange.png',
		missed_call_red_svg    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/missed-call-red.png',
		bot_icon               : 'https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/web_bot',
		cogoport_logo          : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogoLogo.svg',
		user_avatar            : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/img_avatar.png',
		destination_icon       : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/destination-icon.svg',
		document_icon_png      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 180.png',
		download_icon_svg     	: 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/download-icon.svg',
		document_icon_dark_svg : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/document-svg.svg',
		day_one_png            : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 181.png',
		books_png              : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 182.png',
		map_png                : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 183.png',
		nodata_image           : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-empty-doc.svg',
		promocode_thumbnail:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/eb9c91d9226c746eee7eb971c0dfdfeb/Group.svg',
		risk_free:
		'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/MicrosoftTeams-image (14).png',
		empty_list           : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/noShipmentFound.svg',
		pie_chart_loader     : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-spinner.svg',
		yellow_vessel        : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/shipYellow.png',
		red_vessel           : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/shipRed.png',
		black_vessel         : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/shipArrow.png',
		cogo_logo_without_bg : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-logo-without-bg',
		spinner_loader       : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-spinner.svg',
		empty_image          : 'https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/empty_item.svg',
		list_empty_image     : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-state.svg',
		list_empty           : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/list_emptystate.png',
		cogopoint_image      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogopoints.svg',
		network_loader       : 'https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-loading.gif',
		user_avatar_image    : 'https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/avatar-placeholder.webp',
		list_no_result_found : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no ressult found.svg',
		line_chart_img       : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/stats-line.svg',
		pie_chart_img        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/pie-chart.svg',
		cogo_one_logo        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-one-logo.svg',
		call_icon            : 'https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/call_light.svg',
		whatsapp_icon        : 'https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/wapp_light.svg',
		email_icon           : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/email_icon_blue_2.svg',
		login_failed         : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/login_failed.png',
		checkout_failed      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/checkout_failed.png',
		email_clicked        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/email_clicked.png',
		abandon_shipmemts    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/abandon_shipmemts.png',
		cargo_insurance_loader:
			'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/loading-cargo-insurance.svg',
		seller_address_svg : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/sellerAddress.svg',
		empty_promocode    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/promocodes_not_found.svg',
		cogo_verse_svg     : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo_verse_icon.svg',
		cogo_one_svg       : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-one-logo.svg',
		cogo_one_loader    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-one-loader.gif',
		bluetide_hbl_logo:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/6f67ac5379afb6694a75e573407899f2/bluetidelogo.png',
		cogoport_admin_logo : 'https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-admin.svg',
		inbox_icon          : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/colored_inbox.png',
		email_spam_icon     : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/mail_flag.png',
		spam_flag_icon      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/spam_flag_black.png',
		email_inbox_icon    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/inbox_icon.png',
		colored_loading     : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/spinner.svg',
		over_due_svg        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-over-due.svg',
		due_in_svg          : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-due-in.svg',
		cogo_assured_svg    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-assured.svg',
		empty_data          : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/userAvatar.svg',
		empty_data_image    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man',
		awb_docs_images     : {
			original_3:
			'https://cogoport-production.sgp1.digitaloceanspaces.com/1fcd0257b396ea304a7aebfeaceaee76/original_3.png',
			original_2:
			'https://cogoport-production.sgp1.digitaloceanspaces.com/34f4ab91d2f08e432f5e99cec869e07b/original_2.png',
			original_1:
			'https://cogoport-production.sgp1.digitaloceanspaces.com/30186a4d8094f78fffba0aeac1847cd0/original_1.png',
			copy_9:
			'https://cogoport-production.sgp1.digitaloceanspaces.com/5b6c3ea3e1a28d1c3060f835ad206e99/copy_9.png',
			copy_4:
			'https://cogoport-production.sgp1.digitaloceanspaces.com/1c5be0fc713882e9b85303b62d3f1ac8/copy_4.png',
			copy_5:
			'https://cogoport-production.sgp1.digitaloceanspaces.com/3a65756e817610ddf75769c89145eb84/copy_5.png',
			copy_6:
			'https://cogoport-production.sgp1.digitaloceanspaces.com/84eaddd1db3e444b25d1ce0066f19581/copy_6.png',
			copy_7:
			'https://cogoport-production.sgp1.digitaloceanspaces.com/ca3a74c08dd2aabcba392de64cd04ed6/copy_7.png',
			copy_8:
			'https://cogoport-production.sgp1.digitaloceanspaces.com/c56cba1039292819dd6d700d5d8f5d07/copy_8.png',
			copy_10:
			'https://cogoport-production.sgp1.digitaloceanspaces.com/94fec99404e921d7a1de47c30a4e5afa/copy_10.png',
			copy_11:
			'https://cogoport-production.sgp1.digitaloceanspaces.com/daabebf1b3ade5afb890dbc79ce3b9eb/copy_11.png',
			copy_12:
			'https://cogoport-production.sgp1.digitaloceanspaces.com/7c2328f811865365b3c50d0fc23849fc/copy_12.png',
		},
		awb_docs_tnc_page:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/8b7f9de6c16ef64db501a7e71dc7aa96/back.jpg',
		message_reply        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/message_reply.png',
		cargo_ship_vector    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cargoShipsVector.png',
		ic_initial_state_svg : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-initialstate.svg',
		ticket_not_found     : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/emptyState.svg',
		ticket_loading       : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/spinner.svg',
		ticket_not_created   : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/sad_face.png',
		organization         : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/organ-svg.svg',
		user_activity        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/user-actrivity.svg',
		clock                : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/alarm-timer.svg',
		timer                : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/timer-icon1.svg',
		note                 : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/note.svg',
		quick_actions        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/actions.svg',
		customer_insights    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/customer-insight.svg',
		help_desk            : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/faq-icon-final.svg',
		clock_icon:
		'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/clock_icon_with_hands.svg',
		sad_icon                : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image_216.svg',
		sign_up_failed          : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/sinup_failed.png',
		kyc_event               : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/kyc_event.png',
		default_event           : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/default_event.png',
		password_validator_tick : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/tick.svg',
		password_validator_dot  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/dot.svg',
	},

	video_call_ring_tone_url:
	'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/microsoft_teams_audio_call_tone.mp3',

	pdf_url: {
		exception_customer_sample_url: 'https://cogoport-production.sgp1.digitaloceanspaces.com/'
			+ '45773ab4048f606ce6ef06fa1d083352/Book%201%20-%20Copy.xlsx',
	},

	urls: {
		list_emojis: 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/emoji-list.json',
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
				trade_type : 'export',
				label      : 'CIF - Cost, Insurance and Freight',
			},
			cfr: {
				trade_type : 'export',
				label      : 'CFR - Cost and Freight',
			},
			cpt: {
				trade_type : 'export',
				label      : 'CPT - Carriage Paid To',
			},
			cip: {
				trade_type : 'export',
				label      : 'CIP - Carriage and Insurance Paid to',
			},
			dat: {
				trade_type : 'export',
				label      : 'DAT - Delivered At Terminal',
			},
			dap: {
				trade_type : 'export',
				label      : 'DAP - Delivered At Place',
			},
			ddp: {
				trade_type : 'export',
				label      : 'DDP - Delivered Duty Paid',
			},
			fob: {
				trade_type : 'import',
				label      : 'FOB - Free On Board',
			},
			exw: {
				trade_type : 'import',
				label      : 'EXW - Ex Works',
			},
			fca: {
				trade_type : 'import',
				label      : 'FCA - Free Carrier',
			},
			fas: {
				trade_type : 'import',
				label      : 'FAS - Free Alongside Ship',

			},
		},
		role_options: [
			{ value: 'software_development_engineer_1', label: 'Software Development Engineer - I' },
			{ value: 'business_analyst', label: 'Business Analyst' },
			{ value: 'product_analyst', label: 'Product Analyst' },
			{ value: 'business_consultant', label: 'Business Consultant' },
			{ value: 'key_accounts_manager', label: 'Key Accounts Manager' },
		],
		timezone_options: [
			{
				label: 'IST', value: 'IST',
			},
			{
				label: 'GMT', value: 'GMT',
			},
			{
				label: 'VNM', value: 'VNM',
			},
		],
	},

	regex_patterns: {
		number           : /^[+-]?\d*\.?\d+$/,
		white_space      : /\s+/,
		email            : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
		pan_number       : /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g,
		aadhar_number    : /^[1-9]{1}[0-9]{11}$/g,
		passport_number  : /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/,
		ifsc_code        : /^[A-Za-z]{4}\d{7}$/,
		eway_bill_number : /^\d{12}$/,
		url_match:
			'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)',
		image_extension                   : /\.(jpg|jpeg|png|gif|svg)$/i,
		empty_spaces_before_tab_character : / +(?=\t)/g,
		mime                              : /:(.*?);/m,
		double_curly_braces_pattern       : /\{\{([^{}]+)\}\}/g,
		occurrences_of_paragraphs_tag     : /<p>\s+(<[/]p>)/g,
		enclosed_within_forward_slashes   : /<p>(<[/]p>)/g,
		words_prefixed_by_digits          : /(\d+)([a-z]+)/i,
		occurrences_of_line_breaks        : /(\r\n|\r|\n)/g,
		url_match_regex:
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
		ends_with_star_space   : /\* /,
		ends_with_star_char    : /\*[^0-9a-zA-Z]/,
		string_to_array        : /'/g,
		file_upload_url        : /:finalUrl=>"([^"]*)"/,
		four_characters_pin    : /^.{4}$/,
		amount_seperator       : /\D/g,
		white_space_characters : /\s/g,
		email_subject_prefix   : /^(re|fwd|fw):\s*/i,
		para_html_tag_text     : /<p>([\s\S]*?)<\/p>/gm,
		h1_html_tag_text       : /<h1>([\s\S]*?)<\/h1>/gm,
		h2_html_tag_text       : /<h2>([\s\S]*?)<\/h2>/gm,
		h3_html_tag_text       : /<h3>([\s\S]*?)<\/h3>/gm,
		li_html_tag_text       : /<li>([\s\S]*?)<\/li>/gm,
	},
	zeroth_index                 : 0,
	milliseconds_in_one_day      : 86400000,
	languages                    : LANGUAGE_OPTIONS,
	currency_conversion_constant : 0.04,
	others                       : {
		old_shipment_serial_id      : 120347,
		cogopoint_default_value     : 0,
		fcl_import_new_process_date : '2023-07-27T00:00:00',

	},
	shipment_types: [
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
	service_supported_countries: {
		feature_supported_service: {
			cargo_insurance: {
				countries: ['IN'],
			},
			treasury: {
				currencies: ['INR', 'USD', 'VND'],
			},
		},
	},
	services: {
		fcl_freight: {
			unit: {
				name: 'per container', short_name: '/Cont',
			},
		},
		fcl_customs: {
			unit: {
				name: 'per container', short_name: '/Cont',
			},
		},
		fcl_cfs: {
			unit: {
				name: 'per container', short_name: '/Cont',
			},
		},
		air_freight: {
			unit: {
				name: 'per kg', short_name: '/Kg',
			},
		},
		air_customs: {
			unit: {
				name: 'per kg', short_name: '/Kg',
			},
		},
		lcl_freight: {
			unit: {
				name: 'per cbm', short_name: '/CBM',
			},
		},
		lcl_customs: {
			unit: {
				name: 'per cbm', short_name: '/CBM',
			},
		},
		haulage_freight: {
			unit: {
				name: 'per container', short_name: '/Cont',
			},
		},
		trailer_freight: {
			unit: {
				name: 'per truck', short_name: '/Truck',
			},
		},
		ltl_freight: {
			unit: {
				name: 'per truck', short_name: '/Truck',
			},
		},
		ftl_freight: {
			unit: {
				name: 'per truck', short_name: '/Truck',
			},
		},
	},
	SHIPMENT_ROUTE_MAPPING: {
		fcl_freight           : 'fcl',
		air_freight           : 'air-freight',
		lcl_freight           : 'lcl',
		ltl_freight           : 'ltl',
		ftl_freight           : 'ftl',
		haulage_freight       : 'haulage',
		air_customs           : 'air-customs',
		fcl_customs           : 'fcl-custom',
		air_freight_local     : 'air-freight-local',
		fcl_freight_local     : 'fcl-local',
		domestic_air_freight  : 'domestic-air-freight',
		rail_domestic_freight : 'rail-domestic',
	},

	emails: {
		import_rates : 'Import.rates@cogoport.com',
		export_rates : 'Export.rates@cogoport.com',
	},
};

export default GLOBAL_CONSTANTS;
