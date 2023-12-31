/* eslint-disable max-len */
/* eslint-disable custom-eslint/regex-check, custom-eslint/uuid-check */
export default {
	country: {
		id   : '541d1232-58ce-4d64-83d6-556a42209eb7',
		name : 'India',
		code : 'IN',
		flag_icon_url:
			'https://prod-cogoport.s3.ap-south-1.amazonaws.com/India_24.png',
		currency: {
			code   : 'INR',
			symbol : '₹',
		},
		mobile_country_code       : '+91',
		invoice_allowed_languages : ['english'],
	},
	formats: {
		amount: {
			scope: {
				admin: {
					locale: 'en-IN',
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
		TAX                                : /^([A-Z]{3}[PCHFATBLJG]{1}[A-Z]{1}[0-9]{4}[A-Z]{1})+$/g, // PAN Regular Expression
		GST                                : /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([A-Za-z]{3}[PCHFATBLJGpchfatbljg]{1}[A-Za-z]{1}[0-9]{4}[A-Za-z]{1}[1-9A-Za-z]{1}[Zz]{1}[0-9A-Za-z]{1})+$/g,
		ECN                                : '',
		MOBILE_NUMBER                      : /^[+][0-9]{1,3}[0-9]{10}$/,
		EMAIL                              : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
		CONTAINER_NUMBER                   : /^[A-Z]{3}U[0-9]{6,7}$/,
		MOBILE_NUMBER_WITHOUT_COUNTRY_CODE : /^[0-9]{10}$/,
		// password_pattern:
		// 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/gm,
	},
	office_locations: [
		'gurgaon',
		'mumbai',
		'delhi',
		'coimbatore',
		'bangalore',
		'chennai',
		'kolkata',
		'noida',
		'ambala',
		'haldia',
		'ludhiana',
		'kochi',
		'hyderabad',
		'pune',
		'jaipur',
		'raipur',
		'ahmedabad',
		'vadodara',
		'rudrapur',
		'bagdogra',
	],
	uuid: {
		super_admin_id                   : '5de782f6-f59d-41fc-84f4-8425dc1fa670',
		admin_id                         : 'ebafce31-75ef-4865-9060-775574e9606f',
		tech_super_admin_id              : '381b9d1d-e005-4cc0-9844-a5f1636e71b1',
		parent_entity_id                 : '6fd98605-9d5d-479d-9fac-cf905d292b88',
		cogoverse_shipment_specialist_id : '1b1c5648-ddf4-4472-b177-c11a53a505aa',
		cogoverse_admin_id               : '84dcd923-89cb-4bc6-baf7-7f23d93d6951',
		cogoverse_user_id                : 'a217c304-5296-4f1d-948c-814fa9ed9cdb',
		cogo_demo_account_shipper        : ['302bdc56-e807-4c71-a27c-92f83640f140'],
		cogo_auditor_id                  : 'fc2f1dac-6de9-4dd9-990e-bd8746fc10ce',
		spot_booking_shipping_lines      : [
			'c3649537-0c4b-4614-b313-98540cffcf40',
			'b2f92d49-6180-43bd-93a5-4d64f5819a9b',
			'fb1aa2f1-d136-4f26-ad8f-2e1545cc772a',
			'2d477bb2-8956-4dbe-bd8b-71144b60374c',
			'3c5d996c-4d4e-4a2b-bce7-1024b46f7300',
			'9ee49704-f5a7-4f17-9e25-c5c3b5ec3d1d',
			'be57f277-0c81-47b4-9322-bf06ccc5314c',
		],
		third_party_enrichment_agencies_role_ids : ['38d20d88-e987-4b65-a9ad-c41dd134845b'],
		third_party_enrichment_agencies_rm_ids   : [],
		cogoxpress_id                            : '536abfe7-eab8-4a43-a4c3-6ff318ce01b5',
		any_carrier_airline_id                   : '30798ff1-992c-48f0-aabd-eb92e98df747',
		customer_service_role_ids                : ['0461c31b-4761-40b6-ac2a-59a4e9d4e23f'],
		sales_role_ids                           : [
			'fdf55227-a433-4450-aab0-5e4c215ea72c',
			'95113dbb-43bf-4434-958c-3fe8063657e7',
			'0461c31b-4761-40b6-ac2a-59a4e9d4e23f',
		],
		cogo_demo_account_shipper_user: '7f6f97fd-c17b-4760-a09f-d70b6ad963e8',
		cogo_demo_account_shipper_user_branch:
			'2c72817c-c663-48ea-b8ef-cd92397842a1',
		business_owner_ids : ['0f9ddc9b-e2d7-4fee-83f6-08fb8bed6d11', '8ecf37e5-4605-4c4c-9f8f-77183101317'],
		supply_role_ids    : [
			'e31c6d7b-e62e-4fd5-a2e1-106e037ac03c',
			'70710ab2-0f80-4e12-a4f5-d75660c05315',
			'a1ddec39-48a5-4ab5-8db4-16fa02cdf720',
			'b0ccb9d9-84a7-47b3-97ea-136424129ab7',
			'b6612571-bb02-4e5c-b6d4-131259667f29',
			'd9c490f9-afcc-467e-a86d-2a02edf81959',
			'568c5939-3721-4444-a0ff-4c0298bc948d',
		],
		supplier_relations_head_id: '0a623fc0-bd23-4990-b2ec-0115d3f1095b',

		supply_relation_manager_role_id: '568c5939-3721-4444-a0ff-4c0298bc948d',

		cogo_freight_supplier      : '5dc403b3-c1bd-4871-b8bd-35543aaadb36',
		prod_process_owner         : 'ae80297f-e30d-45fb-845c-61c302523476',
		air_prod_process_owner     : '9e6dad55-dc0c-42b4-a7d1-9908204cdca7',
		corporate_owner_id         : '89184155-1f77-4265-826a-e997d140002f',
		corporate_owner_finance_id : '5063d25a-7312-4eb6-93fd-41020ba62e17',
		operation_manager          : 'ed3e6418-6013-4710-83cf-5b0b117aa8a1',
		kam_ids                    : [
			'9ead41d4-ced8-45c2-b370-4399cbfcf478', // Prod_KAM Location Sales
			'0bc8c199-09ed-4a85-b3a3-a855f05a2716', // KAM - SME Demand
			'f9905d33-24d7-48ca-99cd-eeca13a90d5a', // KAM Manager - SME Demand
			'0ad0034e-da18-49d2-b35c-36e08e8bcdcd', // Prod_KAM ES Manager
			'a35fbbbe-38ea-4ee8-82a8-06d1245a23a4', // Prod_KAM ES
			'4f7ba0b4-304b-4d5d-98e5-fb61a7c823da', // Prod_KAM CP Manager
			'e0e2f83b-9e5b-41a3-948e-ab1ec9b0f3ad', // Prod_KAM CP
			'eab24509-187e-42b4-ae51-b77c74d82ad9', // Overseas CP KAM
			'a5c83696-0248-4846-a558-1a054360f130', // Overseas CP KAM Manager
			'650e1fe4-2e34-43c1-abfe-ce0a443aa4a6', // Prod_KAM Trasnport Sales
			'f041b303-3239-42c5-a386-03e787900bcd', // Cogoverse KAM
			'1b1c5648-ddf4-4472-b177-c11a53a505aa', // Shipment Specialist
			'97649798-385e-42e7-b766-274fe1f04438', // CPKAM-Vietnam
			'60b1593a-ab3d-4541-9746-d486f6e32a71', // Sales Owner
			'579c3044-8daf-4ec1-bedf-47155deb0fa1', // SME KAM - Vietnam
			'594be53f-e39a-45d1-a705-57660a4a4a00', // IE Owner - SME Demand
			'a35fbbbe-38ea-4ee8-82a8-06d1245a23a4', // KAM - Enterprise Demand
			'eb292d80-a05f-4a56-a0f7-ef51255583aa', // Prod_KAM_Transport_Supply
			'b5dd96b2-11a2-4655-8319-040614262f3d', // OKAM (Operational Key Account Manager)
			'78433553-e4dd-4871-8bd7-293f6f12e49a', // cogoone agent
			'69013c68-2d1b-4332-91fb-ada1a6471240', // business consultant
			'9380aaeb-53e3-4e6a-ba39-405b4b822ea5',
			'5f79d531-50e0-4843-995f-71057e659e0f',
			'447c2b70-90c9-4e9d-a0df-49bb803b0314',
			'264a83ab-d438-48c3-8095-bb503f5b619c',
			'c71dd2db-9c8d-4d0c-84c6-beece1b3af42', // ES Team Lead - Enterprise Demand
			'ad12ce9e-2cc9-4a14-8e36-d3ee2df0cf63', // Trade Expert Team Lead - Long Tail
			'8e0c7f28-f77c-44ae-9fef-901ca85fada5', // Portfolio Team Lead
		],
		kam_manager_ids: [
			'0ad0034e-da18-49d2-b35c-36e08e8bcdcd', // Prod_KAM ES Manager,
			'f9905d33-24d7-48ca-99cd-eeca13a90d5a', // KAM Manager - SME Demand,
			'594be53f-e39a-45d1-a705-57660a4a4a00', // IE Owner - SME Demand,
			'37557738-13bb-4db8-96ef-6eac4549a5ac', // CP KAM Owner,
			'4f7ba0b4-304b-4d5d-98e5-fb61a7c823da', // CP KAM Manager
			'a3d802b5-4fc2-4cea-8c97-2a329ba463b1', // ES Owner Enterprise-Demand
			'41590453-f7c9-44b2-ba2c-f37d57e57e5a', // CCS Manager - Channel Partner
			'dc5e8695-c30e-4350-9de9-8218ed1abfc4', // CCS Manager - Enterprise
			'2aa607a9-4f92-47b0-963f-be18c215e88d',
		],
		cp_program_manager               : '122c2266-6c55-4b97-9f61-1056f87b53a7',
		cogo_freight_pvt_ltd_pr_supplier : '6cc6b696-60f6-480b-bcbe-92cc8e642531',
		freight_force_org_id             : '36cee6fb-eeaf-4643-9db5-397544339635',
		supply_relations_head_role_id    : '0a623fc0-bd23-4990-b2ec-0115d3f1095b',
		fin_ops_manager_role_id          : 'bdd39a3c-6f01-4228-905f-7d61acc66860',
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
		coe_head                  : '0e68d129-6f07-4324-95ee-88731b35c0c4', // temporarily id for vietnam coe_head
		prod_settlement_executive : 'b11f5c3e-4608-4f1d-b2dd-a59b92da1e2a',
		finops_manager            : 'bdd39a3c-6f01-4228-905f-7d61acc66860',
		cogo_auditor              : 'fc2f1dac-6de9-4dd9-990e-bd8746fc10ce',
		ff_cost_booking_executive : '8cc096a8-e279-425c-ba95-3970614c3d8e',
		service_ops2_role_id      : [
			'017856dc-b424-4145-9181-5680732cb33b',
			'8b04b2b9-baa1-4913-bf4c-b11effecef0b', // SO2 Executive
			'd974d323-b777-47a8-b14a-64df2e59df84', // SO1 + SO2
		],
		lastmile_ops_id         : 'b808aabb-2245-4369-aaa7-6ebd2d5de20b',
		lastmile_ops_manager_id : '3965f742-f4e5-420a-911c-f3657be05028',
		credit_controller_id    : 'b2af88f9-84e4-44fd-92f8-12f74c55e5ae',
		business_heads          : [
			'7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44', // Hrishikesh Kulkarni
			'95d62549-8ab6-4ee5-a655-9edd0ec46dac', // Purnendu Shekhar
			'cd8dde11-678c-4467-85b2-2e2d6055bef4', // Amitabh Shankar
			'2d01b146-fd01-4887-8586-f398c929ef29', // Mohit Mogera
		],
		vietnam_business_heads: [
			'7f6f97fd-c17b-4760-a09f-d70b6ad963e8', // Rishi Agarwal
		],
		prod_kam_cp           : 'e0e2f83b-9e5b-41a3-948e-ab1ec9b0f3ad',
		prod_es_sales         : 'c71dd2db-9c8d-4d0c-84c6-beece1b3af42',
		entity_manager_id     : '9d1d10dd-06c0-489d-92f8-272c6a40e9bb',
		lcl_so2_executive     : '12dd0f6f-7256-403f-bfd1-913bc466c775', // SO2 Executive (LCL)
		service_ops1_role_ids : [
			'5b5ee698-ec53-47fe-9584-737c9a174f8c', // Prod_SO1
			'f0af57b0-34eb-46e8-86a6-38abafcfc072', // SO1
			'e18774d7-54b3-41e8-af04-3b44bd3a3fe2', // SO1 Executive
			'd974d323-b777-47a8-b14a-64df2e59df84', // SO1 + SO2
			'30e7e3e4-5d6d-456d-af50-56896d4ea6aa', // Air S01
		],
		service_ops3_role_ids: [
			'60869bd4-5f18-4400-a003-411eb49dcd4a', // Prod_COE_Finance_Executive
			'7000ed27-f649-4e00-9c20-8c20c9eccf78', // Prod_COE_Finance_Head
			'2644ceb0-ebd4-4c51-af71-45067f27d78b', // Finance Controller Head
			'ede05be5-8e8b-4f5a-8954-ae1b53c3cdc3', // Account Receivable Executive
			'e48ae064-781a-43ee-af27-b7d4ed37329f', // Prod_Account Payable Executive
			'6106378a-44e0-4f60-9f4b-4160843d9dc9', // Temp-  Corporate Owner Finance
			'1f7b1fd3-5c5b-4009-9cb5-c712436bc071', // Corporate Owner Fintech
			'b5e1c496-9d2c-47bc-b9c2-a24ce7ba1cd0', //	Prod Overseas Desk
		],
		so1_so2_ops_role_id              : 'd974d323-b777-47a8-b14a-64df2e59df84',
		costbooking_ops_role_ids         : '281d52f4-096f-4c92-a629-57719c716ac6',
		costbooking_ops_manager_role_ids : '219e184e-b080-4c83-837d-eb4b26a42e45',
		account_receivable_executive     : 'ede05be5-8e8b-4f5a-8954-ae1b53c3cdc3',
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
		ie_owner_sme_demand   : '594be53f-e39a-45d1-a705-57660a4a4a00',
		portfolio_manager_id  : '46f33843-8f73-45c0-89c8-248aa1698bb0',
		pre_sales_agent       : 'ad12ce9e-2cc9-4a14-8e36-d3ee2df0cf63',
		credit_controller_ids : [
			'8d8a9009-9a1e-40e6-b6c0-2bb40aba0918',
			'59559d86-853d-41b5-a613-a1fd7b3eb76e',
			'2acd7cb8-a986-45f3-8e14-391075d50daf',
			'b2af88f9-84e4-44fd-92f8-12f74c55e5ae',
		],
		prod_coe_finance_head : '7b1fc916-6984-4179-aee5-c23f9871085d',
		so_1_manager          : '17885538-e746-4650-a5bc-7d4d81247c7d',
		air_so_1_manager      : 'b61bec0d-b9ba-4674-930c-9192aad288ef',
		cogoverse_kam         : 'f041b303-3239-42c5-a386-03e787900bcd',
		cogoverse_admin       : '84dcd923-89cb-4bc6-baf7-7f23d93d6951',
		cogoverse_executive   : 'f23810d3-c6c0-4937-bf2e-2ad301dd708d',
		so_2_manager          : [
			'1665784f-6e58-4299-8a33-4b7487f61188',
			'eff02645-cb9c-44bf-8f5a-4d273b36e52d', // Prod_SO-2 Manager
		],
		cogo_one_admin_ids: [
			'381b9d1d-e005-4cc0-9844-a5f1636e71b1', // Tech SuperAdmin
			'84dcd923-89cb-4bc6-baf7-7f23d93d6951', // Cogoverse Admin
			'5de782f6-f59d-41fc-84f4-8425dc1fa670', // SuperAdmin
		],
		cogo_one_admin_user_ids: [
			'660ee2d6-3ea4-4c50-a722-d3f886503437', // Akshay Deshpande
		],
		cogo_one_shipment_agent_ids: [
			'1b1c5648-ddf4-4472-b177-c11a53a505aa', // CogoVerse Shipment Specialist
		],
		cogo_one_kam_agent_ids: [
			'f041b303-3239-42c5-a386-03e787900bcd', // Cogoverse Kam
		],
		so1_so2_role_id     : '0285645b-0d06-42a2-9968-67d544626300', // SO1 and SO2 VN
		fortigo_network_ids : [
			'4160f6e2-05bd-4aac-ab40-bee3b05b045d',
			'45ed3980-21bf-4e14-a9b1-abc1a2ce3067',
		],
		ftl_agencies_mapping: {
			fortigo_transport_agency  : '45ed3980-21bf-4e14-a9b1-abc1a2ce3067',
			fortigo_network_logistics : '4160f6e2-05bd-4aac-ab40-bee3b05b045d',
		},
		hrbp_admin_role_id           : '5de782f6-f59d-41fc-84f4-8425dc1fa670',
		igm_desk                     : '8eba8e1a-2d76-430b-a7f0-87198e9dae8c',
		document_control_manager     : 'fd65db3f-ad50-4594-8be6-7ab373e57c4f',
		ftl_ground_ops_role_id       : 'd2275231-30ad-4df9-8451-daf03b766f8a',
		field_service_ops_role_id    : '6ebacc3c-05c9-43fd-8a51-e7aad9751d9b',
		kam_service_ops1_role_id     : '4c6f6036-2383-4c40-9b84-fa2b598031e1',
		centralised_customer_support : [
			'264a83ab-d438-48c3-8095-bb503f5b619c',	// Common Pool
			'9380aaeb-53e3-4e6a-ba39-405b4b822ea5', // SME
			'447c2b70-90c9-4e9d-a0df-49bb803b0314',	// Enterprise Sales
			'5f79d531-50e0-4843-995f-71057e659e0f', // Channel Partner
		],
		document_control_lead          : 'ce9831f7-5e5b-419a-8420-679e5ef9c9e9',
		corporate_owner_demand         : '14fe1423-3c2d-4f66-bc33-89bed08b92ee',
		finops_credit_controller       : '8ab56d1b-b6c1-41e3-9c83-63278380aec7',
		finance_head                   : ['a8a175c5-fec2-4c08-8e6b-0fb5c7951c86', '635658c1-8d6b-4ab5-83a4-bd4989287193'],
		so1_revenue_desk               : ['348bc262-64c3-4667-a23c-908ceca80233', 'f896df94-f77d-4e6d-b5dd-3a4b936f8401'],
		supply_fulfillment             : 'd86b05c2-0b60-46ba-9585-bfcd9ea17b6e',
		finops                         : 'a0343e2b-1b69-4d18-931e-fa473c152b56',
		cogo_one_kyc                   : 'b70ad8e8-fb0a-4af9-8821-b804e0da5a2d',
		finance_branch_accounts        : '1cfe962d-3274-4a48-b1ed-8baecac3f4af',
		service_ops3                   : '726e644b-9dfa-4a6f-ac9c-f830d26e33e5', // SO3 Vietnam
		data_superadmin                : 'df340ea2-91b5-4cbc-80ab-d11cec21f040',
		kam_admin                      : 'df6591f0-f41b-4283-9966-7d0225e1df00', // Kam Admin Vietnam
		so2_executive                  : '12dd0f6f-7256-403f-bfd1-913bc466c775', // SO2 Executive (LCL)'
		prod_data_operations_associate : 'dcdcb3d8-4dca-42c2-ba87-1a54bc4ad7fb', // Prod_Data Operations Associate
	},
	options: {
		registration_types: [
			{
				label : 'Private Limited Company',
				value : 'private_limited',
			},
			{
				label : 'Public Limited Company',
				value : 'public_limited',
			},
			{
				label : 'Partnership',
				value : 'partnership',
			},
			{
				label : 'Proprietorship',
				value : 'proprietorship',
			},
			{
				label : 'Limited Liability Partnership',
				value : 'limited_liability_partnership',
			},
			{
				label : 'Other',
				value : 'other',
			},
		],
		country_truck_type : 'open_body_pickup_1ton',
		open_truck         : [
			{
				label : 'PICKUP 1TON',
				value : 'open_body_pickup_1ton',
			},
			{
				label : 'TATA ACE 750 800KGS',
				value : 'open_body_tata_ace_750_800kgs',
			},
			{
				label : 'TATA 407 2.5TON',
				value : 'open_body_tata_407_2.5ton',
			},
			{
				label : 'LCV 14FT 4TON',
				value : 'open_body_LCV_14ft_4ton',
			},
			{
				label : 'LCV 17FT 5TON',
				value : 'open_body_LCV_17ft_5ton',
			},
			{
				label : 'LCV 19FT 7TON',
				value : 'open_body_LCV_19ft_7ton',
			},
			{
				label : '6TYRE 19 24FT 9TON',
				value : 'open_body_6tyre_19_24ft_9ton',
			},
			{
				label : '10TYRE TAURUS 22FT 16TON',
				value : 'open_body_10tyre_taurus_22ft_16ton',
			},
			{
				label : '12TYRE TAURUS 22FT 22TON',
				value : 'open_body_12tyre_taurus_22ft_22ton',
			},
			{
				label : '12TYRE TAURUS 24FT 25TON',
				value : 'open_body_12tyre_taurus_24ft_25ton',
			},
			{
				label : '14TYRE TAURUS 22FT 26TON',
				value : 'open_body_14tyre_taurus_22ft_26ton',
			},
			{
				label : '14TYRE TAURUS 25FT 26TON',
				value : 'open_body_14tyre_taurus_25ft_26ton',
			},
			{
				label : '14TYRE 30TON',
				value : 'open_body_14tyre_30ton',
			},
			{
				label : '18TYRE 28TON',
				value : 'open_body_18tyre_28ton',
			},
			{
				label : '22TYRE 35TON',
				value : 'open_body_22tyre_35ton',
			},
			{
				label : '40FT FLAT BED TRAILOR 20 25TON',
				value : 'open_40ft_flat_bed_trailor_20_25ton',
			},
			{
				label : '40FT SEMI LOW BED TRAILOR 20 25TON',
				value : 'open_40ft_semi_low_bed_trailor_20_25ton',
			},
			{
				label : '40FT LOW BED TRAILOR 20 25 30TON',
				value : 'open_40ft_low_bed_trailor_20_25_30ton',
			},
		],
		closed_truck: [
			{
				label : 'LCV 14FT 3.5TON',
				value : 'closed_body_LCV_14ft_3.5ton',
			},
			{
				label : 'LCV 17FT 5TON',
				value : 'closed_body_LCV_17ft_5ton',
			},
			{
				label : 'LCV 19FT 7TON',
				value : 'closed_body_LCV_19ft_7ton',
			},
			{
				label : '32FT SINGLE AXLE 7TON',
				value : 'closed_body_32ft_single_axle_7ton',
			},
			{
				label : '32FT SINGLE AXLE HQ 7TON',
				value : 'closed_body_32ft_single_axle_HQ_7ton',
			},
			{
				label : '19 22FT SINGLE AXLE 7TON',
				value : 'closed_body_19_22ft_single_axle_7ton',
			},
			{
				label : '24FT SINGLE AXLE 7TON',
				value : 'closed_body_24ft_single_axle_7ton',
			},
			{
				label : '24FT MULTI AXLE 14 15 TON',
				value : 'closed_body_24ft_multi_axle_14_15_ton',
			},
			{
				label : '32FT MULTI AXLE HQ 14 15 TON',
				value : 'closed_body_32ft_multi_axle_HQ_14_15_ton',
			},
			{
				label : '32FT MULTI AXLE 14 15 TON',
				value : 'closed_body_32ft_multi_axle_14_15_ton',
			},
			{
				label : '32FT TRIPLE AXLE 20 21 TON',
				value : 'closed_body_32ft_triple_axle_20_21_ton',
			},
			{
				label : '32FT TRIPLE AXLE HQ 20 21 TON',
				value : 'closed_body_32ft_triple_axle_HQ_20_21_ton',
			},
		],
		tax_types: [
			{
				label : 'PAN',
				value : 'pan',
			},
		],
		invoice_status: [
			{ label: 'Draft', value: 'DRAFT' },
			{ label: 'Finance Rejected', value: 'FINANCE_REJECTED' },
			{ label: 'Finance Accepted', value: 'FINANCE_ACCEPTED' },
			{ label: 'Irn Generated', value: 'IRN_GENERATED' },
			{ label: 'Irn Failed', value: 'IRN_FAILED' },
			{ label: 'Irn Cancelled', value: 'IRN_CANCELLED' },
			{ label: 'Posted to Sage', value: 'POSTED' },
			{ label: 'Post to Sage Failed', value: 'FAILED' },
		],
		invoice_status_new: [
			{ label: 'Draft', value: 'DRAFT' },
			{ label: 'Finance Rejected', value: 'FINANCE_REJECTED' },
			{ label: 'Finance Accepted', value: 'FINANCE_ACCEPTED' },
			{ label: 'Irn Generated', value: 'IRN_GENERATED' },
			{ label: 'Irn Failed', value: 'IRN_FAILED' },
			{ label: 'Irn Cancelled', value: 'IRN_CANCELLED' },
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
		entities: [
			{
				label : '101 COGO FREIGHT PVT LTD',
				value : '101',
			},
			{
				label : '201 Cogoport Netherlands',
				value : '201',
			},
			{
				label : '301 COGOPORT PRIVATE LIMITED',
				value : '301',
			},
			{
				label : '401 Cogo Universe Pte. Ltd',
				value : '401',
			},
			{
				label : '501 Cogoport Vietnam',
				value : '501',
			},
			{
				label : '601 Cogoport Thailand',
				value : '601',
			},
			{
				label : '701 Cogoport Indonesia',
				value : '701',
			},
			{
				label : '801 Cogoport China',
				value : '801',
			},
		],
		migration_status: [
			{ label: 'True', value: true },
			{ label: 'False', value: false },
		],
		services: [
			{ label: 'FCL Freight', value: 'FCL_FREIGHT' },
			{ label: 'LCL Freight', value: 'LCL_FREIGHT' },
			{ label: 'FTL Freight', value: 'FTL_FREIGHT' },
			{ label: 'LTL Freight', value: 'LTL_FREIGHT' },
			{ label: 'Air Freight', value: 'AIR_FREIGHT' },
			{ label: 'Haulage', value: 'HAULAGE_FREIGHT' },
		],
		education_level: {
			post_graduates_degree: [
				{
					label : 'Master of Business Administration (M.B.A)',
					value : 'master_of_business_administration_(M.B.A)',
				},
				{ label: 'Master of Technology (M.Tech)', value: 'master_of_technology_(M.Tech)' },
				{ label: 'Master of Commerce (M.Com)', value: 'master_of_commerce_(M.Com)' },
				{ label: 'Master of Arts (M.A)', value: 'master_of_arts_(M.A)' },
				{ label: 'Master of Science (M.Sc)', value: 'master_of_science_(M.Sc)' },
				{ label: 'Master of Architecture (M.Arch)', value: 'master_of_architecture_(M.Arch)' },
				{ label: 'Master of Law (LL.M)', value: 'master_of_law_(LL.M)' },
				{ label: 'Master of Computer Applications (M.C.A)', value: 'master_of_computer_applications_(M.C.A)' },
				{ label: 'Master of Business Management (M.B.M)', value: 'master_of_business_management_(M.B.M)' },
				{
					label : 'Master of International Business (M.I.B)',
					value : 'master_of_international_business_(M.I.B)',
				},
				{ label: 'Masters in Design (M.Des)', value: 'masters_in_design_(M.Des)' },
				{
					label : 'Masters Programme in International Business (M.P.I.B)',
					value : 'masters_rogramme_in_international_business_(M.P.I.B)',
				},
				{ label: 'Master of Business Laws (M.B.L)', value: 'master_of_business_laws_(M.B.L)' },
				{ label: 'Master of Philosophy (M.Phil)', value: 'master_of_philosophy_(M.Phil)' },
				{ label: 'Master of Management Program (M.M.P)', value: 'master_of_management_program_(M.M.P)' },
				{ label: 'Master of Journalism (M.J)', value: 'master_of_journalism_(M.J)' },
				{
					label : 'Master of International Business (M.I.B)',
					value : 'master_of_international_business_(M.I.B)',
				},
				{ label: 'Others', value: 'others' },
			],
			graduate_degree: [
				{
					label : 'Bachelor of Engineering/Tech (BE/B.Tech)',
					value : 'bachelor_of_engineering/tech_(BE/B.Tech)',
				},
				{ label: 'Bachelor of Science', value: 'bachelor_of_science' },
				{ label: 'Bachelor of Arts', value: 'bachelor_of_arts' },
				{ label: 'Bachelor of Law (B.L)', value: 'bachelor_of_law_(B.L)' },
				{ label: 'Bachelor of Commerce', value: 'bachelor_of_commerce' },
				{ label: 'Bachelor of Design (B.Des)', value: 'bachelor_of_design_(B.Des)' },
				{ label: 'Bachelor of Visual Arts (B.V.A)', value: 'bachelor_of_visual_arts_(B.V.A)' },
				{ label: 'Bachelor of Architecture (B.Arch)', value: 'bachelor_of_architecture_(B.Arch)' },
				{ label: 'Bachelor of Applied Sciences (B.A.S)', value: 'bachelor_of_applied_sciences_(B.A.S)' },
				{
					label : 'Bachelor of Computer Applications (B.C.A)',
					value : 'bachelor_of_computer_applications_(B.C.A)',
				},
				{ label: 'BMS/BBA/BBS', value: 'BMS/BBA/BBS' },
				{ label: 'Bachelor of Business Studies (B.B.S)', value: 'bachelor_of_business_studies_(B.B.S)' },
				{ label: 'Bachelor of Business Management (B.B.M)', value: 'bachelor_of_business_management_(B.B.M)' },
				{
					label : 'Bachelor of Business Administration (B.B.A)',
					value : 'bachelor_of_business_administration_(B.B.A)',
				},
				{
					label : 'Bachelor of Fashion Technology (B.F.Tech)',
					value : 'bachelor_of_fashion_technology_(B.F.Tech)',
				},
				{
					label : 'Bachelor of Medicine Bachelor of Surgery (M.B.B.S)',
					value : 'bachelor_of_medicine_bachelor_of_surgery_(M.B.B.S)',
				},
				{ label: 'Bachelor of Pharmacy (B.Pharma)', value: 'bachelor_of_pharmacy_(B.Pharma)' },
				{ label: 'IIM 5-year Integrated Mgmt. Program', value: 'iim_5_year_integrated_mgmt._program' },
				{ label: 'Others', value: 'others' },
			],
			doctorate_degree: [
				{ label: 'Doctor of Medicine (M.D.)', value: 'doctor_of_medicine_(M.D.)' },
				{ label: 'Doctor of Philosophy (Ph.D)', value: 'doctor_of_philosophy_(Ph.D)' },
				{ label: 'Master of Dental Surgery (M.D.S)', value: 'master_of_dental_surgery_(M.D.S)' },
				{ label: 'Phd in management', value: 'phd_in_management' },
				{ label: 'Others', value: 'others' },
			],
		},
		disable_options: ['10th', '12th', 'Diploma'],
	},
	navigations: {

		settlement_onAccountCollection: {
			tabs: [
				'ap-ar-settlement',
				'tds-settlement',
				'history',
				'onAccountCollection',
				'JournalVoucher',
			],
		},
		supply_dashboard: {
			rfq_enquiries: {
				tabs: [
					'live_bookings',
					'trade_enquiry',
					'disliked_rates',
					'rate_density',
					'manage_forecast',
					'rfq_enquiries',
					'rates_sheets',
				],
			},
		},

		enrichment: {
			whatsapp_number_label            : 'Whatsapp Number',
			is_allowed_for_enrichment_sheets : true,
			hide_columns                     : {
				relationship_manager_view: {
					active    : ['status'],
					responded : ['status'],
					success   : ['status'],
					failed    : ['action'],
				},
				agent_view: {
					active    : ['requested_agent', 'status'],
					responded : ['requested_agent', 'status'],
					success   : ['requested_agent', 'status'],
					failed    : ['requested_agent', 'action'],
				},
			},
			actions: {
				active: {
					add: 'Add Details',
				},
				responded:	{
					edit: 'Edit Details',
				},
				success: {
					view: 'View Details',
				},
			},
		},
		account_receivables: {
			defaulters: {
				migration_status: {
					show_filter: true,
				},
			},
		},
		over_heads: {
			region_specific_cogo_entities            : false,
			expense_non_recurring_upload_invoice_tds : false,
		},
	},
	others: {
		registration_number: {
			label      : 'GST',
			pattern    : /\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}/g,
			max_length : 15,
		},
		banking_code: {
			financial_system_code : 'ifsc',
			pattern               : /^[A-Z]{4}0[A-Z0-9]{6}$/,
		},
		pan_number: {
			label   : 'PAN',
			pattern : /^([A-Z]{3}[PCHFATBLJG]{1}[A-Z]{1}[0-9]{4}[A-Z]{1})+$/g,
		},
		economic_zone: {
			label: 'SEZ',
		},
		identification_number: {
			label   : 'PAN Number',
			pattern : /^([A-Z]{3}[PCHFATBLJG]{1}[A-Z]{1}[0-9]{4}[A-Z]{1})+$/g,
		},

		ask_gst_details: true,

		navigations: {
			onboard_vendor: {
				validate_registration : true,
				registration_types    : false,
			},
			cogo_one: {
				has_voice_call_access       : true,
				template_default_language   : 'english',
				supply_sender_mobile_number : '918069195980',
			},
			bookings: {
				invoicing: {
					is_invoice_mergeable              : false,
					disable_edit_invoice              : true,
					stakeholder_wise_invoice_required : true,
					is_purchase_visible_to_kam        : false,
					is_task_visible_to_so2_executive  : false,
					edit_internal_poc                 : false,
				},
			},
			business_finance: {
				ar: {
					settlement: {
						invoice_number: {
							document_key : 'destinationDocumentValue',
							irn_key      : 'destinationIrnNumber',
						},
					},
				},
			},
			partner: {
				bookings: {
					invoicing: {
						request_cancel_invoice  : false,
						request_replace_invoice : false,
						request_credit_note     : true,
					},
				},
				common: {
					validate_registration_number : true,
					validate_pan_number          : true,
					include_gst                  : true,
					is_export_tradeType          : true,
				},
			},
		},
	},
};
