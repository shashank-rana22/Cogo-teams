const GLOBAL_CONSTANTS = {
	country_entity_ids: {
		IN : '6fd98605-9d5d-479d-9fac-cf905d292b88',
		VN : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
	},
	servicable_country_ids: {
		IN : '541d1232-58ce-4d64-83d6-556a42209eb7',
		VN : '177fcbad-8ef7-4324-871c-6c31745f4411',
	},
	country_ids: {
		IN : '541d1232-58ce-4d64-83d6-556a42209eb7',
		VN : '177fcbad-8ef7-4324-871c-6c31745f4411',
		GB : '222d4b9d-56a8-4580-b761-a71c653263fb',
	},
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
			'dd/MM/yyyy'       : 'dd/MM/yyyy',
			'dd MMM yyyy'      : 'dd MMM yyyy',
			'dd-MM-yyyy'       : 'dd-MM-yyyy',
			'yyyy-MM-dd'       : 'yyyy-MM-dd',
			MMM                : 'MMM',
			'dd MMM'           : 'dd MMM',
			'MMM, yyyy'        : 'MMM, yyyy',
			'MMM dd, yyyy'     : 'MMM dd, yyyy',
			PP                 : 'PP',
			'PP hh:mm a'       : 'PP hh:mm a',
			'MM-yyyy'          : 'MM-yyyy',
			'd MMM yyyy, eeee' : 'd MMM yyyy, eeee',
			'MM-dd-yyyy'       : 'MM-dd-yyyy',
			'EEE-dd'           : 'EEE-dd',
			yyyy               : 'yyyy',
			'dd/MMM/yyyy'      : 'dd/MMM/yyyy',
			'dd MMMM yyyy'     : 'dd MMMM yyyy',
		},
		time: {
			'hh:mm aaa' : 'hh:mm aaa',
			'HH:mm'     : 'HH:mm',
			'hh:mm:ss'  : 'hh:mm:ss',
			hh          : 'hh',
			HH          : 'HH',
			mm          : 'mm',
			a           : 'a',
			'00:00:00'  : '00:00:00',
			'23:59:59'  : '23:59:59',
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
		local_charge_providers : {
			IN : '5dc403b3-c1bd-4871-b8bd-35543aaadb36',
			GB : '5eef8dfe-c485-414a-bbcb-82a8388539e3',
			UK : '5eef8dfe-c485-414a-bbcb-82a8388539e3',
		},
		third_party_enrichment_agencies_role_ids : ['38d20d88-e987-4b65-a9ad-c41dd134845b'],
		paramount_org_id                         : '1e4b9f43-4863-4e29-a944-8e9e8780e514',
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
	country_specific_data: {
		IN: {
			registration_number: {
				label: 'GST',
				pattern:
					/\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}/g,
				max_length: 15,
			},

			pan_number: {
				label   : 'PAN',
				pattern : /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g,
			},

			economic_zone: {
				label: 'SEZ',
			},
		},
		VN: {
			registration_number: {
				label      : 'VAT',
				pattern    : /^[0-3]{1}[0-9]{9}$|^[0-3]{1}[0-9]{9}-?[0-9]{3}$/,
				max_length : 15,
			},

			pan_number: {
				label   : 'PAN',
				pattern : undefined,
			},

			economic_zone: {
				label: 'Non-Tariff Zone',
			},
		},
	},

	cogoport_entities: {
		101: {
			country_code : 'IN',
			name         : 'COGO FREIGHT PVT LTD',
			id           : '6fd98605-9d5d-479d-9fac-cf905d292b88',
			labels       : {
				irn_label: 'IRN',
			},
		},
		201: {
			country_code : 'NL',
			name         : 'Cogoport Netherlands',
			id           : 'c7e1390d-ec41-477f-964b-55423ee84700',
			labels       : {
				irn_label: 'IRN',
			},
		},
		301: {
			country_code : 'IN',
			name         : 'COGOPORT PRIVATE LIMITED',
			id           : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
			labels       : {
				irn_label: 'IRN',
			},
		},
		401: {
			country_code : 'SG',
			name         : 'Cogo Universe Pte. Ltd',
			id           : '04bd1037-c110-4aad-8ecc-fc43e9d4069d',
			labels       : {
				irn_label: 'IRN',
			},
		},
		501: {
			country_code : 'VN',
			name         : 'Cogoport Vietnam',
			id           : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
			labels       : {
				irn_label: 'E-INVOICE',
			},
		},
	},
};

export default GLOBAL_CONSTANTS;
