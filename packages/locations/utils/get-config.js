import { startCase } from '@cogoport/utils';

const fields = [
	{
		key   : 'name',
		label : 'Name',
		span  : 3,
	},
	{
		key   : 'type',
		label : 'Type',
		func  : 'startCase',
		span  : 3,
	},
	{
		key       : 'status',
		label     : 'Status',
		condition : { type: ['continent', 'region'] },
		span      : 2,
	},
	{
		key       : 'country_code',
		label     : 'Country Code',
		condition : {
			type: [
				'country',
				'city',
				'cfs',
				'region',
				'yard',
				'warehouse',
				'railway_terminal',
			],
		},
		span: 2,
	},
	{
		name        : 'port_code',
		type        : 'text',
		placeholder : 'Port Code',
		condition   : { type: ['seaport', 'airport'] },
		span        : 2,
	},
	{
		name        : 'postal_code',
		type        : 'text',
		placeholder : 'Postal Code',
		condition   : { type: ['pincode', 'cluster', 'warehouse'] },
		span        : 2,
	},
	{
		name        : 'site_code',
		type        : 'text',
		placeholder : 'Site Code',
		condition   : { type: ['warehouse', 'railway_terminal'] },
		span        : 2,
	},
	{
		key   : 'created_at',
		label : 'Created at',
		type  : 'datetime',
		span  : 3,
	},
];

const getFilterControls = () => [
	{
		type        : 'text',
		name        : 'q',
		placeholder : 'name',
	},
	{
		name        : 'type',
		placeholder : 'Type',
		type        : 'select',
		options     : [
			{ label: 'Pincode', value: 'pincode' },
			{ label: 'City', value: 'city' },
			{ label: 'Region', value: 'region' },
			{ label: 'Seaport', value: 'seaport' },
			{ label: 'Trade', value: 'trade' },
			{ label: 'Airport', value: 'airport' },
			{ label: 'Country', value: 'country' },
			{ label: 'Cluster', value: 'cluster' },
			{ label: 'Continent', value: 'continent' },
			{ label: 'Cfs', value: 'cfs' },
			{ label: 'Yard', value: 'yard' },
			{ label: 'Warehouse', value: 'warehouse' },
			{ label: 'Railway terminal', value: 'railway_terminal' },
		],
	},
	{
		name        : 'status',
		placeholder : 'Status',
		type        : 'select',
		options     : [
			{ label: 'Active', value: 'active' },
			{ label: 'Inactive', value: 'inactive' },
		],
	},
	{
		name        : 'postal_code',
		type        : 'text',
		placeholder : 'Enter postal code',
		condition   : { type: ['pincode'] },
	},
	{
		name        : 'latitude',
		type        : 'text',
		placeholder : 'Enter latitude',
	},
	{
		name        : 'longitude',
		type        : 'text',
		placeholder : 'Enter longitude',
	},
	{
		name        : 'currency_code',
		type        : 'text',
		placeholder : 'Enter currency code',
	},
	{
		name           : 'continent_id',
		type           : 'location-select',
		placeholder    : 'Select continent',
		optionsListKey : 'locations',
		params         : { filters: { type: ['continent'] } },
	},
	{
		name           : 'trade_id',
		type           : 'location-select',
		placeholder    : 'Select trade lane',
		optionsListKey : 'locations',
		params         : { filters: { type: ['trade'] } },
	},
	{
		name           : 'country_id',
		type           : 'location-select',
		placeholder    : 'Select country',
		optionsListKey : 'locations',
		params         : { filters: { type: ['country'] } },
	},
	{
		name           : 'region_id',
		type           : 'location-select',
		placeholder    : 'Select country',
		optionsListKey : 'locations',
		params         : { filters: { type: ['region'] } },
	},
	{
		name           : 'city_id',
		type           : 'location-select',
		placeholder    : 'Select city',
		optionsListKey : 'locations',
		params         : { filters: { type: ['city'] } },
	},
	{
		name           : 'cluster_id',
		type           : 'location-select',
		placeholder    : 'Select cluster',
		optionsListKey : 'locations',
		params         : { filters: { type: ['cluster'] } },
	},
	{
		name           : 'seaport_id',
		type           : 'location-select',
		placeholder    : 'Select seaport',
		optionsListKey : 'locations',
		params         : { filters: { type: ['seaport'] } },
	},
	{
		name           : 'airport_id',
		type           : 'location-select',
		placeholder    : 'Select airport',
		optionsListKey : 'locations',
		params         : { filters: { type: ['airport'] } },
	},
	{
		name           : 'pincode_id',
		type           : 'location-select',
		placeholder    : 'Select pincode',
		optionsListKey : 'locations',
		params         : { filters: { type: ['pincode'] } },
	},
	{
		name           : 'cfs_code',
		type           : 'location-select',
		placeholder    : 'Select cfs',
		optionsListKey : 'locations',
		params         : { filters: { type: ['cfs'] } },
	},
	{
		name        : 'port_code',
		type        : 'text',
		placeholder : 'Enter port',
		condition   : { type: ['seaport'] },
	},
	{
		name        : 'inttra_code',
		type        : 'text',
		placeholder : 'Enter inttra code',
	},
];

const details = [
	{
		key   : 'type',
		label : 'Type',
	},
	{
		key   : 'name',
		label : 'Name',
	},
	{
		key   : 'display_name',
		label : 'Display name',
	},
	{
		key   : 'latitude',
		label : 'Latitude',
	},
	{
		key   : 'longitude',
		label : 'Longitude',
	},
	{
		key   : 'postal_code',
		label : 'Postal code',
	},
	{
		key   : 'site_code',
		label : 'Site Code',
	},
	{
		key   : 'port_code',
		label : 'Port code',
	},
	{
		key   : 'inttra_code',
		label : 'Inttra code',
	},
	{
		key   : 'currency_code',
		label : 'Currency code',
	},
	{
		key   : 'country_code',
		label : 'Country code',
	},
	{
		key   : 'mobile_country_code',
		label : 'Mobile country code',
	},
	{
		key   : 'address',
		label : 'Address',
	},
	{
		key   : 'status',
		label : 'Status',
	},
	{
		key   : 'created_at',
		label : 'Created at',
		type  : 'date',
	},
];

const getTabs = (actions, getViews) => {
	// const { formatCardFields, functions } = extraDetails;
	const tabs = {};
	const getDetails = () => ({ actions, heading: 'Details', details });
	const filterControls = getFilterControls();
	const creatableCountry = [
		'continent',
		'trade',
		'country',
		'city',
		'seaport',
		'airport',
		'pincode',
		'cfs',
		'cluster',
		'region',
		'yard',
		'warehouse',
		'zone',
		'railway_terminal',
	];
	creatableCountry.forEach((type) => {
		const newFields = fields.filter(
			(field) => !field?.condition || field?.condition?.type.includes(type),
		);
		tabs[type] = {
			title  : startCase(type),
			fields : newFields,
			api    : 'list_locations',
			empty  : {
				heading    : `No ${type} found`,
				subheading : `${type} will be visible here`,
			},
			filterProps: {
				dynamicKeyControls : {},
				controls           : filterControls,
				isScrollable       : true,
			},
			views   : getViews,
			details : getDetails(),
		};
	});
	return tabs;
};

const getConfig = (actions, getViews, extraDetails) =>
// const { globalActions } = extraDetails;
	({
		title: 'Location',

		globalViews : ['create'],
		tabs        : {
			applyMaxTab : false,
			filterKey   : 'type',
			active      : 'continent',
			tabs        : { ...getTabs(actions, getViews, extraDetails) },
		},
	});
export default getConfig;
