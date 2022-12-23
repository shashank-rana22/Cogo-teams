const global = {
	NOTIFICATION_POLLING_INTERVAL         : 300000,
	COGO_FREIGHT_SUPPLIER                 : '5dc403b3-c1bd-4871-b8bd-35543aaadb36',
	COGO_DEMO_ACCOUNT_SHIPPER             : '302bdc56-e807-4c71-a27c-92f83640f140',
	COGO_FREIGHT_PVT_LTD_PR_SUPPLIER      : '6cc6b696-60f6-480b-bcbe-92cc8e642531',
	COGO_DEMO_ACCOUNT_SHIPPER_USER        : '7f6f97fd-c17b-4760-a09f-d70b6ad963e8',
	COGO_DEMO_ACCOUNT_SHIPPER_USER_BRANCH : '2c72817c-c663-48ea-b8ef-cd92397842a1',
	PARENT_PARTNER_ENTITY_ID              : '6fd98605-9d5d-479d-9fac-cf905d292b88',
	BUSINESS_MANAGER_IDS                  : [
		'65ddf583-2786-4fd3-85b3-971094395e2b',
		'e31c6d7b-e62e-4fd5-a2e1-106e037ac03c',
	],
	BUSINESS_OWNER_IDS : ['0f9ddc9b-e2d7-4fee-83f6-08fb8bed6d11'],
	VIEW_KEY_MAPPINGS  : {
		sales_team_members_view          : 'sales_agent_id',
		booking_team_members_view        : 'booking_agent_id',
		supply_team_members_view         : 'supply_agent_id',
		pi_approval_team_members_view    : 'pi_approval_agent_id',
		default                          : 'sales_agent_id',
		entity_manager_team_members_view : 'entity_manager_id',
		reporting_manager_view           : 'reporting_manager_id',
	},
	SUPPLY_ROLE_IDS: [
		'e31c6d7b-e62e-4fd5-a2e1-106e037ac03c',
		'70710ab2-0f80-4e12-a4f5-d75660c05315',
		'a1ddec39-48a5-4ab5-8db4-16fa02cdf720',
		'b0ccb9d9-84a7-47b3-97ea-136424129ab7',
		'b6612571-bb02-4e5c-b6d4-131259667f29',
		'd9c490f9-afcc-467e-a86d-2a02edf81959',
		'568c5939-3721-4444-a0ff-4c0298bc948d',
	],
	CUSTOMER_SERVICE_ROLE_IDS        : ['0461c31b-4761-40b6-ac2a-59a4e9d4e23f'],
	SERVICE_OPERATION_ROLE_IDS       : ['f23a6a68-394b-4f92-a0d2-22e009b05f26'],
	PROCUREMENT_AND_FULLFILLMENT_IDS : ['b0ccb9d9-84a7-47b3-97ea-136424129ab7'],
	LOGISTICS_AGENT_IDS              : ['b6612571-bb02-4e5c-b6d4-131259667f29'],
	LCW_TIMER                        : 10000,
	FINANCE_HEAD_ID                  : 'a8a175c5-fec2-4c08-8e6b-0fb5c7951c86',
	INDIA_COUNTRY_ID                 : '541d1232-58ce-4d64-83d6-556a42209eb7',
	SALES_ROLE_IDS                   : [
		'fdf55227-a433-4450-aab0-5e4c215ea72c',
		'95113dbb-43bf-4434-958c-3fe8063657e7',
		'0461c31b-4761-40b6-ac2a-59a4e9d4e23f',
	],
	OKAM_ROLE_IDS: [
		'45662f18-8090-450a-9e0d-5805788af4fb',
		'b5dd96b2-11a2-4655-8319-040614262f3d',
		'844a859d-bca4-40a0-a534-53f5405fa754',
	],
	TECH_SUPPORT_ROLE_ID        : '63208c69-06aa-4bd4-a598-bbf141d1b5ed',
	SPOT_BOOKING_SHIPPING_LINES : [
		'c3649537-0c4b-4614-b313-98540cffcf40',
		'b2f92d49-6180-43bd-93a5-4d64f5819a9b',
		'fb1aa2f1-d136-4f26-ad8f-2e1545cc772a',
		'2d477bb2-8956-4dbe-bd8b-71144b60374c',
		'3c5d996c-4d4e-4a2b-bce7-1024b46f7300',
		'9ee49704-f5a7-4f17-9e25-c5c3b5ec3d1d',
		'be57f277-0c81-47b4-9322-bf06ccc5314c',
	],
	TEMP_COE_ID               : '5ea6b9fa-25e1-4328-ac20-74e01aab1902',
	SUPERADMIN_ID             : '5de782f6-f59d-41fc-84f4-8425dc1fa670',
	ADMIN_ID                  : 'ebafce31-75ef-4865-9060-775574e9606f',
	CREDIT_CONTROLLER_ROLE_ID : '8ab56d1b-b6c1-41e3-9c83-63278380aec7',
	COE_FINANCE_HEAD          : '7000ed27-f649-4e00-9c20-8c20c9eccf78',
	CUSTOMER_SUPPORT          : 'support@cogoport.com',
	GENERIC_KAM_ROLE_ID       : 'e9fca698-1b66-4ea7-b03c-1e47706c7249',

	SERVICE_OPS1_ROLE_IDS: [
		'348bc262-64c3-4667-a23c-908ceca80233', // SO1 + Revenue Desk
		'5b5ee698-ec53-47fe-9584-737c9a174f8c', // Prod_SO1
		'f0af57b0-34eb-46e8-86a6-38abafcfc072', // SO1
		'12dd0f6f-7256-403f-bfd1-913bc466c775', // SO1
		'e18774d7-54b3-41e8-af04-3b44bd3a3fe2', // SO1 Executive
	],
	SERVICE_OPS2_ROLE_ID: [
		'017856dc-b424-4145-9181-5680732cb33b',
		'12dd0f6f-7256-403f-bfd1-913bc466c775', // LCL So2
	],
	SERVICE_OPS3_ROLE_IDS: [
		'60869bd4-5f18-4400-a003-411eb49dcd4a', // Prod_COE_Finance_Executive
		'7000ed27-f649-4e00-9c20-8c20c9eccf78', // Prod_COE_Finance_Head
		'2644ceb0-ebd4-4c51-af71-45067f27d78b', // Finance Controller Head
		'ede05be5-8e8b-4f5a-8954-ae1b53c3cdc3', // Account Receivable Executive
	],
	KAM_IDS: [
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

	PROD_PROCESS_OWNER: 'ae80297f-e30d-45fb-845c-61c302523476',

	PROD_SO2_MANAGER: 'eff02645-cb9c-44bf-8f5a-4d273b36e52d',

	SO2_MANAGER_AMS_DESK: '5465b7eb-dd4d-4247-9a92-d3a3c5ed7de0',

	PROD_KAM_ES_MANAGER: '0ad0034e-da18-49d2-b35c-36e08e8bcdcd',

	CREDIT_CONTROLLER_IDS: [
		'8d8a9009-9a1e-40e6-b6c0-2bb40aba0918',
		'59559d86-853d-41b5-a613-a1fd7b3eb76e',
		'2acd7cb8-a986-45f3-8e14-391075d50daf',
		'b2af88f9-84e4-44fd-92f8-12f74c55e5ae',
	],
	COGOXPRESS_ID              : '536abfe7-eab8-4a43-a4c3-6ff318ce01b5',
	CREDIT_CONTROLLER_ID       : 'b2af88f9-84e4-44fd-92f8-12f74c55e5ae',
	MAIL_TEMPLATE_ID_WIS       : '2297299e-f846-4913-96c9-91956a3bd2ed',
	MAIL_TEMPLATE_ID_SOA       : '25486363-15fe-4be7-b0bc-44d1b7cea90b',
	PROD_KAM_CP                : 'e0e2f83b-9e5b-41a3-948e-ab1ec9b0f3ad',
	PROD_ES_SALES              : 'c71dd2db-9c8d-4d0c-84c6-beece1b3af42',
	PORTFOLIO_MANAGER_ID       : '46f33843-8f73-45c0-89c8-248aa1698bb0',
	ENTITY_MANAGER_ID          : '9d1d10dd-06c0-489d-92f8-272c6a40e9bb',
	FLASH_BOOKING_CHARGE_CODES : [
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
	PROD_KAM_IE         : '0bc8c199-09ed-4a85-b3a3-a855f05a2716',
	PROD_KAM_IE_MANAGER : 'f9905d33-24d7-48ca-99cd-eeca13a90d5a',
	PRE_SALES_AGENT     : 'ad12ce9e-2cc9-4a14-8e36-d3ee2df0cf63',

	CREDIT_CONTROLLER_USER_IDS: [
		'ad5dd683-77d6-4443-a628-86e5fbac4e03',
		'd15a6237-7332-4627-a18f-28db6fcbecc7',
		'59559d86-853d-41b5-a613-a1fd7b3eb76e',
		'2acd7cb8-a986-45f3-8e14-391075d50daf',
		'8d8a9009-9a1e-40e6-b6c0-2bb40aba0918',
		'91fc265d-b043-48a0-874e-268181dd0206',
	],
	SALES_ROLE: [
		'c71dd2db-9c8d-4d0c-84c6-beece1b3af42',
		'0bc8c199-09ed-4a85-b3a3-a855f05a2716',
		'e0e2f83b-9e5b-41a3-948e-ab1ec9b0f3ad',
		'9d1d10dd-06c0-489d-92f8-272c6a40e9bb',
		'46f33843-8f73-45c0-89c8-248aa1698bb0',
		'eab24509-187e-42b4-ae51-b77c74d82ad9',
	],
	PROD_SETTLEMENT_EXECUTIVE   : 'b11f5c3e-4608-4f1d-b2dd-a59b92da1e2a',
	SHIPPING_LINE_SUPPLY_AGENTS : [
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
	],
	FINOPS_MANAGER: 'bdd39a3c-6f01-4228-905f-7d61acc66860',

	FREIGHT_FORCE_ORG_ID: '36cee6fb-eeaf-4643-9db5-397544339635',
};

export default global;
