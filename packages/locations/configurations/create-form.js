/* eslint-disable max-lines-per-function */
const getFields = (t = () => {}) => [
	{
		name        : 'name',
		label       : t('locations:controls_name_label'),
		type        : 'text',
		placeholder : t('locations:controls_name_placeholder'),
	},
	{
		name        : 'type',
		label       : t('locations:controls_type_label'),
		type        : 'select',
		placeholder : t('locations:controls_type_placeholder'),
		options     : [
			{ label: t('locations:tabs_pincode_label'), value: 'pincode' },
			{ label: t('locations:tabs_city_label'), value: 'city' },
			{ label: t('locations:tabs_region_label'), value: 'region' },
			{ label: t('locations:tabs_seaport_label'), value: 'seaport' },
			{ label: t('locations:tabs_airport_label'), value: 'airport' },
			{ label: t('locations:tabs_cluster_label'), value: 'cluster' },
			{ label: t('locations:tabs_cfs_label'), value: 'cfs' },
			{ label: t('locations:tabs_yard_label'), value: 'yard' },
			{
				label : t('locations:tabs_warehouse_label'),
				value : 'warehouse',
			},
			{
				label : t('locations:tabs_railway_terminal_label'),
				value : 'railway_terminal',
			},
		],

		rules: { required: t('locations:controls_type_rules_required') },
	},
	{
		name        : 'status',
		label       : t('locations:controls_status_label'),
		type        : 'select',
		placeholder : t('locations:controls_status_placeholder'),
		options     : [
			{ label: t('locations:controls_status_options_active'), value: 'active' },
			{ label: t('locations:controls_status_options_inactive'), value: 'inactive' },
		],
		rules: { required: t('locations:controls_status_rules_required') },
	},
	{
		name        : 'postal_code',
		label       : t('locations:controls_postal_code_label'),
		type        : 'text',
		placeholder : t('locations:controls_postal_code_placeholder'),
		condition   : { type: ['pincode', 'airport', 'seaport'] },

	},
	{
		name        : 'site_code',
		label       : t('locations:controls_site_code_label'),
		type        : 'text',
		placeholder : t('locations:controls_site_code_placeholder'),
		condition   : { type: ['warehouse', 'railway_terminal'] },
	},
	{
		name        : 'address',
		label       : t('locations:controls_address_label'),
		type        : 'text',
		placeholder : t('locations:controls_address_placeholder'),
	},
	{
		name        : 'latitude',
		label       : t('locations:controls_latitude_label'),
		type        : 'text',
		placeholder : t('locations:controls_latitude_placeholder'),
		rules       : { required: t('locations:controls_latitude_rules_required') },
	},
	{
		name        : 'longitude',
		label       : t('locations:controls_longitude_label'),
		type        : 'text',
		placeholder : t('locations:controls_longitude_placeholder'),
		rules       : { required: t('locations:controls_longitude_rules_required') },
	},
	{
		name        : 'currency_code',
		label       : t('locations:controls_currency_code_label'),
		type        : 'text',
		placeholder : t('locations:controls_currency_code_placeholder'),
		condition   : { type: ['country'] },
		rules       : { required: t('locations:controls_currency_code_rules_required') },
	},
	{
		name        : 'country_code',
		label       : t('locations:controls_country_code_label'),
		type        : 'text',
		placeholder : t('locations:controls_country_code_placeholder'),
		condition   : { type: ['country'] },
		rules       : { required: t('locations:controls_country_code_rules_required') },
	},
	{
		name        : 'mobile_country_code',
		label       : t('locations:controls_mobile_country_code_label'),
		type        : 'text',
		condition   : { type: ['country'] },
		placeholder : t('locations:controls_mobile_country_code_placeholder'),
		rules       : { required: t('locations:controls_mobile_country_code_rules_required') },
	},
	{
		name        : 'country_id',
		label       : t('locations:controls_country_id_label'),
		type        : 'select',
		placeholder : t('locations:controls_country_id_placeholder'),
		condition   : {
			type: [
				'city',
				'seaport',
				'airport',
				'pincode',
				'cfs',
				'cluster',
				'region',
				'yard',
				'railway_terminal',
				'warehouse',
			],
		},
		rules: { required: t('locations:controls_country_id_rules_required') },
	},
	{
		name        : 'zone_id',
		label       : t('locations:controls_zone_id_label'),
		type        : 'select',
		placeholder : t('locations:controls_zone_id_placeholder'),
	},
	{
		name        : 'region_id',
		label       : t('locations:controls_region_id_label'),
		type        : 'select',
		placeholder : t('locations:controls_region_id_placeholder'),
	},
	{
		name        : 'city_id',
		label       : t('locations:controls_city_id_label'),
		type        : 'select',
		placeholder : t('locations:controls_city_id_placeholder'),
		condition   : {
			type: [
				'seaport',
				'airport',
				'pincode',
				'cfs',
				'cluster',
				'yard',
				'warehouse',
				'railway_terminal',
			],
		},
		rules: { message: t('locations:controls_city_id_rules_required') },
	},
	{
		name        : 'cluster_id',
		label       : t('locations:controls_cluster_id_label'),
		type        : 'select',
		placeholder : t('locations:controls_cluster_id_placeholder'),
		condition   : {
			type: ['seaport', 'airport', 'pincode', 'cfs', 'cluster', 'yard'],
		},
	},
	{
		name        : 'pincode_id',
		label       : t('locations:controls_pincode_id_label'),
		type        : 'select',
		placeholder : t('locations:controls_pincode_id_placeholder'),
		condition   : {
			type: [
				'seaport',
				'airport',
				'cfs',
				'yard',
				'railway_terminal',
				'warehouse',
			],
		},
		rules: { required: t('locations:controls_pincode_id_rules_required') },
	},
	{
		name        : 'cfs_code',
		label       : t('locations:controls_cfs_code_label'),
		type        : 'select',
		placeholder : t('locations:controls_cfs_code_placeholder'),
		condition   : { type: ['cfs'] },
	},
	{
		name        : 'port_code',
		label       : t('locations:controls_port_code_label'),
		type        : 'text',
		placeholder : t('locations:controls_port_code_placeholder'),
		condition   : { type: ['seaport', 'airport'] },
	},
	{
		name        : 'inttra_code',
		label       : t('locations:controls_inttra_code_label'),
		type        : 'text',
		condition   : { type: ['seaport'] },
		placeholder : t('locations:controls_inttra_code_placeholder'),
	},
	{
		name        : 'cfs_agency_name',
		label       : t('locations:controls_cfs_agency_name_label'),
		type        : 'text',
		condition   : { type: ['cfs'] },
		placeholder : t('locations:controls_cfs_agency_name_placeholder'),
	},
	{
		name        : 'is_icd',
		label       : t('locations:controls_is_icd_label'),
		type        : 'select',
		placeholder : t('locations:controls_is_icd_placeholder'),
		condition   : { type: ['seaport'] },
	},
	{
		name           : 'local_languages',
		label          : t('locations:controls_local_languages_label'),
		multiple       : true,
		type           : 'select',
		placeholder    : t('locations:controls_local_languages_placeholder'),
		optionsListKey : 'languages',
		options        : [
			{ value: 'english', label: 'English' },
			{ value: 'spanish', label: 'Spanish' },
			{ value: 'mandarin_chinese', label: 'Mandarin chinese' },
			{ value: 'arabic', label: 'العربية, Arabic' },
			{ value: 'bengali', label: 'বাংলা' },
			{ value: 'hindi', label: 'हिन्दी' },
			{ value: 'russian', label: 'русский язык,Russian' },
			{ value: 'portuguese', label: 'Português' },
			{ value: 'japanese', label: '日本語 (にほんご／にっぽんご)' },
			{ value: 'german', label: 'Deutsch' },
			{ value: 'wu_chinese', label: 'Wu chinese' },
			{ value: 'javanese', label: 'basa Jawa' },
			{ value: 'korean', label: '한국어 (韓國語), 조선말 (朝鮮語)' },
			{ value: 'french', label: 'français, langue française' },
			{ value: 'turkish', label: 'Türkçe' },
			{ value: 'vietnamese', label: 'Tiếng Việt' },
			{ value: 'telugu', label: 'తెలుగు' },
			{ value: 'yue_chinese', label: 'Yue chinese' },
			{ value: 'marathi', label: 'मराठी' },
			{ value: 'tamil', label: 'தமிழ்' },
			{ value: 'italian', label: 'Italiano' },
			{ value: 'urdu', label: 'اردو' },
			{ value: 'minnan_chinese', label: 'Minnan chinese' },
			{ value: 'jinyu_chinese', label: 'Jinyu chinese' },
			{ value: 'gujarati', label: 'ગુજરાતી' },
			{ value: 'polish', label: 'polski' },
			{ value: 'ukrainian', label: 'українська' },
			{ value: 'persian', label: 'فارسی' },
			{ value: 'xiang_chinese', label: 'Xiang chinese' },
			{ value: 'malayalam', label: 'മലയാളം' },
			{ value: 'hakka_chinese', label: 'Hakka chinese' },
			{ value: 'kannada', label: 'ಕನ್ನಡ' },
			{ value: 'oriya', label: 'ଓଡ଼ିଆ' },
			{ value: 'western_punjabi', label: 'Western punjabi' },
			{ value: 'sunda', label: 'Sunda' },
			{ value: 'eastern_punjabi', label: 'Eastern punjabi' },
			{ value: 'romanian', label: 'română' },
			{ value: 'dutch', label: 'Nederlands, Vlaams' },
			{ value: 'assamese', label: 'অসমীয়া' },
		],
	},
	{
		name        : 'aliases_attributes',
		label       : t('locations:controls_aliases_attributes_label'),
		type        : 'fieldArray',
		showButtons : true,
		buttonText  : t('locations:controls_aliases_attributes_button_text'),
		controls    : [
			{
				name  : 'name',
				label : t('locations:controls_name_field_array_label'),
				type  : 'text',
				rules : { required: t('locations:controls_name_field_array_rules_required') },
			},
		],
	},
	{
		name            : 'flag_icon_url',
		showLabel       : false,
		label           : t('locations:controls_flag_icon_url_label'),
		span            : 12,
		type            : 'file',
		themeType       : 'secondary',
		drag            : true,
		multiple       	: true,
		onlyURLOnChange : true,
		accept          : 'image/*',
		uploadType      : 'aws',
	},
	{
		name            : 'flag_image_url',
		showLabel       : false,
		label           : t('locations:controls_flag_image_url_label'),
		span            : 12,
		type            : 'file',
		themeType       : 'secondary',
		drag            : true,
		onlyURLOnChange : true,
		accept          : 'image/*',
		uploadType      : 'aws',
	},
];

const getControls = ({
	countryOptions = {},
	zoneOptions = {},
	regionOptions = {},
	cityOptions = {},
	clusterOptions = {},
	pincodeOptions = {},
	cfsOptions = {},
	t = () => {},
}) => (getFields(t) || []).map((control) => {
	const { name } = control;
	let newControl = { ...control };

	if (name === 'country_id') {
		newControl = { ...newControl, ...countryOptions };
	}

	if (name === 'zone_id') {
		newControl = { ...newControl, ...zoneOptions };
	}

	if (name === 'region_id') {
		newControl = { ...newControl, ...regionOptions };
	}

	if (name === 'city_id') {
		newControl = { ...newControl, ...cityOptions };
	}

	if (name === 'cluster_id') {
		newControl = { ...newControl, ...clusterOptions };
	}

	if (name === 'pincode_id') {
		newControl = { ...newControl, ...pincodeOptions };
	}

	if (name === 'cfs_code') {
		newControl = { ...newControl, ...cfsOptions };
	}

	return { ...newControl };
});

export default getControls;
