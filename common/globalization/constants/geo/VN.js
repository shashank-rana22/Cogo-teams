export default {
	country: {
		id   : '177fcbad-8ef7-4324-871c-6c31745f4411',
		name : 'Vietnam',
		code : 'VN',
		flag_icon_url:
			'https://prod-cogoport.s3.ap-south-1.amazonaws.com/Vietnam_24.png',
		currency: {
			code   : 'VND',
			symbol : '₫',
		},
		mobile_country_code: '+84',
	},
	formats: {
		amount: {
			scope: {
				admin: {
					locale: 'vi-VN',
				},
			},
			options: {},
		},
		date: {
			default: 'dd/MM/yyyy',
		},
		time: {
			'12hrs' : 'hh:mm aaa',
			'24hrs' : 'HH:mm',
		},
	},
	regex: {
		PAN           : '',
		GST           : /^[0-9]{1}[0-9]{9}$|^[0-3]{1}[0-9]{9}-?[0-9]{3}$/,
		MOBILE_NUMBER : /^[+][0-9]{1,3}[0-9]{10}$/,
		EMAIL         : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
		// password_pattern:
		// 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/gm,
	},
	uuid: {
		tech_super_admin_id         : '381b9d1d-e005-4cc0-9844-a5f1636e71b1',
		super_admin_id              : '5de782f6-f59d-41fc-84f4-8425dc1fa670',
		admin_id                    : 'ebafce31-75ef-4865-9060-775574e9606f',
		parent_entity_id            : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
		cogo_demo_account_shipper   : ['302bdc56-e807-4c71-a27c-92f83640f140'],
		spot_booking_shipping_lines : [
			'c3649537-0c4b-4614-b313-98540cffcf40',
			'b2f92d49-6180-43bd-93a5-4d64f5819a9b',
			'fb1aa2f1-d136-4f26-ad8f-2e1545cc772a',
			'2d477bb2-8956-4dbe-bd8b-71144b60374c',
			'3c5d996c-4d4e-4a2b-bce7-1024b46f7300',
			'9ee49704-f5a7-4f17-9e25-c5c3b5ec3d1d',
			'be57f277-0c81-47b4-9322-bf06ccc5314c',
		],
		cogoxpress_id             : '536abfe7-eab8-4a43-a4c3-6ff318ce01b5',
		customer_service_role_ids : ['0461c31b-4761-40b6-ac2a-59a4e9d4e23f'],
		sales_role_ids            : [
			'fdf55227-a433-4450-aab0-5e4c215ea72c',
			'95113dbb-43bf-4434-958c-3fe8063657e7',
			'0461c31b-4761-40b6-ac2a-59a4e9d4e23f',
		],
		cogo_demo_account_shipper_user: '7f6f97fd-c17b-4760-a09f-d70b6ad963e8',
		cogo_demo_account_shipper_user_branch:
			'2c72817c-c663-48ea-b8ef-cd92397842a1',
		business_owner_ids : ['0f9ddc9b-e2d7-4fee-83f6-08fb8bed6d11'],
		supply_role_ids    : [
			'e31c6d7b-e62e-4fd5-a2e1-106e037ac03c',
			'70710ab2-0f80-4e12-a4f5-d75660c05315',
			'a1ddec39-48a5-4ab5-8db4-16fa02cdf720',
			'b0ccb9d9-84a7-47b3-97ea-136424129ab7',
			'b6612571-bb02-4e5c-b6d4-131259667f29',
			'd9c490f9-afcc-467e-a86d-2a02edf81959',
			'568c5939-3721-4444-a0ff-4c0298bc948d',
		],
		prod_process_owner         : 'ae80297f-e30d-45fb-845c-61c302523476',
		corporate_owner_id         : '89184155-1f77-4265-826a-e997d140002f',
		corporate_owner_finance_id : '5063d25a-7312-4eb6-93fd-41020ba62e17',
		operation_manager          : 'ed3e6418-6013-4710-83cf-5b0b117aa8a1',
		kam_ids                    : [
			'9ead41d4-ced8-45c2-b370-4399cbfcf478', // Prod_KAM Location Sales
			'0bc8c199-09ed-4a85-b3a3-a855f05a2716', // Prod_KAM IE
			'f9905d33-24d7-48ca-99cd-eeca13a90d5a', // Prod_KAM IE Manager
			'0ad0034e-da18-49d2-b35c-36e08e8bcdcd', // Prod_KAM ES Manager
			'a35fbbbe-38ea-4ee8-82a8-06d1245a23a4', // Prod_KAM ES
			'4f7ba0b4-304b-4d5d-98e5-fb61a7c823da', // Prod_KAM CP Manager
			'e0e2f83b-9e5b-41a3-948e-ab1ec9b0f3ad', // Prod_KAM CP
			'eab24509-187e-42b4-ae51-b77c74d82ad9', // Overseas CP KAM
			'a5c83696-0248-4846-a558-1a054360f130', // Overseas CP KAM Manager
			'650e1fe4-2e34-43c1-abfe-ce0a443aa4a6', // Prod_KAM Trasnport Sales
		],
		cogo_freight_pvt_ltd_pr_supplier : '6cc6b696-60f6-480b-bcbe-92cc8e642531',
		cogo_freight_supplier            : '5dc403b3-c1bd-4871-b8bd-35543aaadb36',
		shipping_line_supply_agents      : [
			'1e3ee025-88a2-43ea-abd5-08017f61f2d2',
			'4248e4d4-59cf-441e-a4a8-83bb29c86bcf',
			'c1d73577-f0c0-463e-ba26-6ea5b01e5f21',
			'b69344b8-f00c-4870-be0f-3233413edccf',
			'0a8c5535-8248-4866-af98-349529d89f56',
			'0f8e19a7-bb90-4a93-bdf7-2bf7e5cf1be3',
			'6094379f-ae1e-414e-8c76-9ebd58668d39',
			'3071219c-357d-4f5b-9d0b-8e537b180cfc',
			'57a11fa0-d7be-4181-b81a-374c9b78ac85',
			'881ec1af-7e7a-445c-bc8c-8c70b5832ce4',
			'2ea5fcf6-e853-4eb5-8362-a57b4b6730c5',
			'b8c242ac-b6a8-4da0-939b-c0f8def6ef05',
			'8a22e7ac-e04b-4b64-88a2-14e03fc90b40',
			'0046214c-2f43-4317-9224-45ca47c8c97f',
			'737bdd26-5c1c-4d31-8e84-20c3a1103e40',
			'0a8c5535-8248-4866-af98-349529d89f56',
			'b69344b8-f00c-4870-be0f-3233413edccf',
		],
		coe_finance_head          : '7000ed27-f649-4e00-9c20-8c20c9eccf78',
		prod_settlement_executive : 'b11f5c3e-4608-4f1d-b2dd-a59b92da1e2a',
		credit_controller_id      : 'b2af88f9-84e4-44fd-92f8-12f74c55e5ae',
		vietnam_business_heads    : [
			'7f6f97fd-c17b-4760-a09f-d70b6ad963e8', // Rishi Agarwal
			'065c7e26-69f7-4ceb-8f36-1e666b89de94', // Nam Bui
		],
		business_heads: [
			'7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44', // Hrishikesh Kulkarni
			'95d62549-8ab6-4ee5-a655-9edd0ec46dac', // Purnendu Shekhar
			'cd8dde11-678c-4467-85b2-2e2d6055bef4', // Amitabh Shankar
			'2d01b146-fd01-4887-8586-f398c929ef29', // Mohit Mogera
		],
		lastmile_ops_id         : 'b808aabb-2245-4369-aaa7-6ebd2d5de20b',
		lastmile_ops_manager_id : '3965f742-f4e5-420a-911c-f3657be05028',
		prod_kam_cp         				: 'e0e2f83b-9e5b-41a3-948e-ab1ec9b0f3ad',
		prod_es_sales        			: 'c71dd2db-9c8d-4d0c-84c6-beece1b3af42',
		entity_manager_id     		: '9d1d10dd-06c0-489d-92f8-272c6a40e9bb',
		service_ops1_role_ids  	: [
			'348bc262-64c3-4667-a23c-908ceca80233', // SO1 + Revenue Desk
			'5b5ee698-ec53-47fe-9584-737c9a174f8c', // Prod_SO1
			'f0af57b0-34eb-46e8-86a6-38abafcfc072', // SO1
			'12dd0f6f-7256-403f-bfd1-913bc466c775', // SO1
			'e18774d7-54b3-41e8-af04-3b44bd3a3fe2', // SO1 Executive
		],
		service_ops2_role_id: [
			'017856dc-b424-4145-9181-5680732cb33b',
			'12dd0f6f-7256-403f-bfd1-913bc466c775', // LCL So2
			'8b04b2b9-baa1-4913-bf4c-b11effecef0b', // SO2 Executive
		],
		service_ops3_role_ids: [
			'60869bd4-5f18-4400-a003-411eb49dcd4a', // Prod_COE_Finance_Executive
			'7000ed27-f649-4e00-9c20-8c20c9eccf78', // Prod_COE_Finance_Head
			'2644ceb0-ebd4-4c51-af71-45067f27d78b', // Finance Controller Head
			'ede05be5-8e8b-4f5a-8954-ae1b53c3cdc3', // Account Receivable Executive
		],
		costbooking_ops_role_ids         : '281d52f4-096f-4c92-a629-57719c716ac6',
		costbooking_ops_manager_role_ids : '219e184e-b080-4c83-837d-eb4b26a42e45',
		sales_role                       : [
			'c71dd2db-9c8d-4d0c-84c6-beece1b3af42',
			'0bc8c199-09ed-4a85-b3a3-a855f05a2716',
			'e0e2f83b-9e5b-41a3-948e-ab1ec9b0f3ad',
			'9d1d10dd-06c0-489d-92f8-272c6a40e9bb',
			'46f33843-8f73-45c0-89c8-248aa1698bb0',
			'eab24509-187e-42b4-ae51-b77c74d82ad9',
		],
		cogo_fx_settings_allowed_role_ids: [
			'a5c83696-0248-4846-a558-1a054360f130', // Overseas CP KAM Manager
			'b665819a-745f-443c-a5e3-55e3f7ffcc60', // Oveseas CP Owner
			'8e0c7f28-f77c-44ae-9fef-901ca85fada5', // Portfolio Team Lead
			'37557738-13bb-4db8-96ef-6eac4549a5ac', // CP KAM Owner
			'4f7ba0b4-304b-4d5d-98e5-fb61a7c823da', // CP KAM Manager
		],
		email_mobile_verification_allowed_ids: [
			'961cc7d4-53f0-4319-96e9-2a90217bdc4e',
			'7f6f97fd-c17b-4760-a09f-d70b6ad963e8',
			'8c22817f-4246-43ef-a7f5-fdf77e37ca72',
		],
		prod_kam_ie_manager   : 'f9905d33-24d7-48ca-99cd-eeca13a90d5a',
		prod_kam_ie           : '0bc8c199-09ed-4a85-b3a3-a855f05a2716',
		portfolio_manager_id  : '46f33843-8f73-45c0-89c8-248aa1698bb0',
		pre_sales_agent       : 'ad12ce9e-2cc9-4a14-8e36-d3ee2df0cf63',
		credit_controller_ids : [
			'8d8a9009-9a1e-40e6-b6c0-2bb40aba0918',
			'59559d86-853d-41b5-a613-a1fd7b3eb76e',
			'2acd7cb8-a986-45f3-8e14-391075d50daf',
			'b2af88f9-84e4-44fd-92f8-12f74c55e5ae',
		],
		prod_coe_finance_head : '7b1fc916-6984-4179-aee5-c23f9871085d',
		finance_head_id       : 'a8a175c5-fec2-4c08-8e6b-0fb5c7951c86',
		so_1_manager          : '17885538-e746-4650-a5bc-7d4d81247c7d',
		cogoverse_kam         : 'f041b303-3239-42c5-a386-03e787900bcd',
		cogoverse_admin       : '84dcd923-89cb-4bc6-baf7-7f23d93d6951',
		cogoverse_user_id     : 'a217c304-5296-4f1d-948c-814fa9ed9cdb',
		so_2_manager          : '1665784f-6e58-4299-8a33-4b7487f61188',
	},
	options: {
		registration_types: [
			{
				label : 'Limited Liability Company',
				value : 'limited_liability_company',
			},
			{
				label : 'Joint Stock Company',
				value : 'joint_stock_company',
			},
			{
				label : 'Representative Office',
				value : 'representative_office',
			},
			{
				label : 'Branch',
				value : 'branch',
			},
		],
		country_truck_type : 'Open_body_1_ton',
		open_truck         : [
			{
				label : '1 Ton',
				value : 'Open_body_1_ton',
			},
			{
				label : '1.5 Ton',
				value : 'Open_body_1.5_ton',
			},
			{
				label : '2 Ton',
				value : 'Open_body_2_ton',
			},
			{
				label : '2.5 Ton',
				value : 'Open_body_2.5_ton',
			},
			{
				label : '3.5 Ton',
				value : 'Open_body_3.5_ton',
			},
			{
				label : '5 Ton',
				value : 'Open_body_5_ton',
			},
			{
				label : '7 Ton',
				value : 'Open_body_7_ton',
			},
			{
				label : '9 Ton',
				value : 'Open_body_9_ton',
			},
			{
				label : '11 Ton',
				value : 'Open_body_11_ton',
			},
			{
				label : '15 Ton',
				value : 'Open_body_15_ton',
			},
			{
				label : '18 Ton',
				value : 'Open_body_18_ton',
			},
		],
		closed_truck: [
			{
				label : '1 Ton',
				value : 'Close_body_1_ton',
			},
			{
				label : '1.5 Ton',
				value : 'Close_body_1.5_ton',
			},
			{
				label : '2 Ton',
				value : 'Close_body_2_ton',
			},
			{
				label : '2.5 Ton',
				value : 'Close_body_2.5_ton',
			},
			{
				label : '2.5 Ton',
				value : 'Close_body_2.5_ton',
			},
			{
				label : '5 Ton',
				value : 'Close_body_5_ton',
			},
			{
				label : '7 Ton',
				value : 'Close_body_7_ton',
			},
			{
				label : '9 Ton',
				value : 'Close_body_9_ton',
			},
			{
				label : '11 Ton',
				value : 'Close_body_11_ton',
			},
			{
				label : '15 Ton',
				value : 'Close_body_15_ton',
			},
			{
				label : '18 Ton',
				value : 'Close_body_18_ton',
			},
		],
		tax_types: [
			{
				label : 'ECN',
				value : 'ecn',
			},
			{
				label : 'Tax',
				value : 'tax',
			},
		],
		invoice_status: [
			{ label: 'Draft', value: 'DRAFT' },
			{ label: 'Finance Rejected', value: 'FINANCE_REJECTED' },
			{ label: 'Finance Accepted', value: 'FINANCE_ACCEPTED' },
			{ label: 'E-INVOICE Generated', value: 'IRN_GENERATED' },
			{ label: 'Requested', value: 'REQUESTED' },
		],
		freight_container_types: [
			{
				label : 'Standard(Dry)',
				value : 'standard',
			},
			{
				label : 'Refrigerated (Reefer)',
				value : 'refer',
			},
			{
				label : 'Open Top',
				value : 'open_top',
			},
			{
				label : 'Flat Rack',
				value : 'flat_rack',
			},
			{
				label : 'ISO Tank',
				value : 'iso_tank',
			},
			{
				label : 'Open Side (One Door Open)',
				value : 'open_side',
			},
		],
	},
	navigations: {
		supply_dashboard: {
			rfq_enquiries: {
				tabs: [
					'live_bookings',
					'trade_enquiry',
					'disliked_rates',
					'manage_forecast',
					'rfq_enquiries',
					'rates_sheets',
				],
			},
		},
	},
};
