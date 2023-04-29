const fields = [

	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		placeholder : 'Enter name',
	},
	{
		name        : 'type',
		label       : 'Type',
		type        : 'select',
		placeholder : 'Select type',
		options     : [
			{ label: 'Pincode', value: 'pincode' },
			{ label: 'City', value: 'city' },
			{ label: 'Region', value: 'region' },
			{ label: 'Seaport', value: 'seaport' },
			{ label: 'Airport', value: 'airport' },
			{ label: 'Cluster', value: 'cluster' },
			{ label: 'Cfs', value: 'cfs' },
			{ label: 'Yard', value: 'yard' },
			{
				label : 'Warehouse',
				value : 'warehouse',
			},
			{
				label : 'Railway Terminal',
				value : 'railway_terminal',
			},
		],

		rules: { required: 'Type is Required' },
	},
	{
		name        : 'status',
		label       : 'Status',
		type        : 'select',
		placeholder : 'Select status',
		options     : [
			{ label: 'Active', value: 'active' },
			{ label: 'Inactive', value: 'inactive' },
		],
		rules: { required: 'Status is Required' },
	},
	{
		name        : 'postal_code',
		label       : 'Postal code',
		type        : 'text',
		placeholder : 'Enter postal code',
		condition   : { type: ['pincode', 'airport', 'seaport'] },

	},
	{
		name        : 'site_code',
		label       : 'Site code',
		type        : 'text',
		placeholder : 'Enter location code',
		condition   : { type: ['warehouse', 'railway_terminal'] },
	},
	{
		name        : 'address',
		label       : 'Address',
		type        : 'text',
		placeholder : 'Enter address',
	},
	{
		name        : 'latitude',
		label       : 'Latitude',
		type        : 'text',
		placeholder : 'Enter latitude',
		rules       : { required: 'Latitude is required' },
	},
	{
		name        : 'longitude',
		label       : 'Longitude',
		type        : 'text',
		placeholder : 'Enter longitude',
		rules       : { required: 'Longitude is required' },
	},
	{
		name        : 'currency_code',
		label       : 'Currency code',
		type        : 'text',
		placeholder : 'Enter currency code',
		condition   : { type: ['country'] },
		rules       : { required: 'Currency is Required' },
	},
	{
		name        : 'country_code',
		label       : 'Country code',
		type        : 'text',
		placeholder : 'Enter country code',
		condition   : { type: ['country'] },
		rules       : { required: 'Country Code is Required' },
	},
	{
		name        : 'mobile_country_code',
		label       : 'Mobile country code',
		type        : 'text',
		condition   : { type: ['country'] },
		placeholder : 'Enter mobile country code',
		rules       : { required: 'Mobile Country Code is required' },
	},
	{
		name        : 'country_id',
		label       : 'Country',
		type        : 'select',
		placeholder : 'Select country',
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
		rules: { required: 'Country is required' },
	},
	{
		name        : 'zone_id',
		label       : 'Zone',
		type        : 'select',
		placeholder : 'Select Zone',
	},
	{
		name        : 'region_id',
		label       : 'Region',
		type        : 'select',
		placeholder : 'Select region',
	},
	{
		name        : 'city_id',
		label       : 'City',
		type        : 'select',
		placeholder : 'Select city',
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
		rules: { message: 'City is Required' },
	},
	{
		name        : 'cluster_id',
		label       : 'Cluster',
		type        : 'select',
		placeholder : 'Select cluster',
		condition   : {
			type: ['seaport', 'airport', 'pincode', 'cfs', 'cluster', 'yard'],
		},
	},
	{
		name        : 'pincode_id',
		label       : 'Pincode',
		type        : 'select',
		placeholder : 'Select pincode',
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
		rules: { required: 'Pincode is Required' },
	},
	{
		name        : 'cfs_code',
		label       : 'CFS',
		type        : 'select',
		placeholder : 'Select cfs',
		condition   : { type: ['cfs'] },
	},
	{
		name        : 'port_code',
		label       : 'Port code',
		type        : 'text',
		placeholder : 'Enter port',
		condition   : { type: ['seaport', 'airport'] },
	},
	{
		name        : 'inttra_code',
		label       : 'Inttra code',
		type        : 'text',
		condition   : { type: ['seaport'] },
		placeholder : 'Enter inttra code',
	},
	{
		name        : 'cfs_agency_name',
		label       : 'CFS agency name',
		type        : 'text',
		condition   : { type: ['cfs'] },
		placeholder : 'Enter cfs agency name',
	},
	{
		name        : 'is_icd',
		label       : 'ICD',
		type        : 'select',
		placeholder : 'Select ICD',
		condition   : { type: ['seaport'] },
	},
	{
		name           : 'local_languages',
		label          : 'Local languages',
		multiple       : true,
		type           : 'select',
		placeholder    : 'Select languages',
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
		label       : 'Aliases attributes',
		type        : 'fieldArray',
		showButtons : true,
		buttonText  : 'Add Aliases',
		controls    : [
			{
				name  : 'name',
				label : 'Name',
				type  : 'text',
				rules : { required: 'Required' },
			},
		],
	},
	{
		name            : 'flag_icon_url',
		showLabel       : false,
		label           : 'Flag Icon svg/image',
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
		label           : 'Flag Icon png/image',
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
}) => fields.map((control) => {
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
