export const EMPLOYMENT_STATUS = [
	{
		label : 'Full Time',
		value : 'full_time',
	},
	{
		label : 'Intern',
		value : 'intern',
	},
	{
		label : 'Third Party',
		value : 'third_party',
	},
];

export const DEPARTMENT = [
	{
		label : 'Technology',
		value : 'technology',
	},
	{
		label : 'Human Resources',
		value : 'human_resources',
	},
	{
		label : 'Finance',
		value : 'finance',
	},
	{
		label : 'Product',
		value : 'product',
	},
	{
		label : 'Design',
		value : 'design',
	},
	{
		label : 'Marketing',
		value : 'marketing',
	},
	{
		label : 'Demand (SME/ CP/ Enterprise) Supply',
		value : 'demand_supply',
	},
	{
		label : 'Operations',
		value : 'operations',
	},
	{
		label : 'Rail',
		value : 'rail',
	},
	{
		label : 'Air',
		value : 'air',
	},
	{
		label : 'Others',
		value : 'others',
	},
];

export const LOCATIONS = [
	{
		label : 'Gurgaon',
		value : 'gurgaon',
	},
	{
		label : 'Mumbai',
		value : 'mumbai',
	},
	{
		label : 'Chennai',
		value : 'chennai',
	},
	{
		label : 'Bangalore',
		value : 'bangalore',
	},
	{
		label : 'Ludhiana',
		value : 'ludhiana',
	},
	{
		label : 'Kolkata',
		value : 'kolkata',
	},
	{
		label : 'Ahmedabad',
		value : 'ahmedabad',
	},
	{
		label : 'Pune',
		value : 'pune',
	},
	{
		label : 'Hyderabad',
		value : 'hyderabad',
	},
	{
		label : 'Jaipur',
		value : 'jaipur',
	},
	{
		label : 'Noida',
		value : 'noida',
	},
	{
		label : 'Others',
		value : 'others',
	},
];

export const EXISTING_DEVICE_OPTIONS = [
	{ label: 'Surrender', value: 'surrender' },
	{ label: 'Retain', value: 'retain' },
];

export const SURRENDER_OPTIONS = [
	{
		label : 'Buying a new laptop from our vendor',
		value : 'buy_vendor',
	},
	{
		label : 'Buying a new laptop from outside',
		value : 'buy_outside',
	},
	{
		label : 'Allotted a desktop',
		value : 'allotted_desktop',
	},
	{
		label : 'Bringing your device',
		value : 'bring_device',
	},
	{
		label : 'Does not apply to me',
		value : 'not_applicable',
	},
];

export const WARRANTY = [
	{
		label : 'Yes',
		value : 'yes',
	},
	{
		label : 'No',
		value : 'no',
	},
	{
		label : 'Not Applicable',
		value : 'not_applicable',
	},
];

export const VENDOR_NAME = [
	{
		label : 'Micron Computers',
		value : 'micron_computers',
	},
	{
		label : 'Global System',
		value : 'global_systems',
	},
	{
		label : 'Team Computer',
		value : 'team_computer',
	},
	{
		label : 'Others',
		value : 'others',
	},
];

export const getDeviceTypeOptions = (existingDevice) => {
	if (existingDevice === 'retain') {
		return [{
			label : 'Existing',
			value : 'existing',
		}];
	}
	return [{
		label : 'New',
		value : 'new',
	},
	{
		label : 'Desktop',
		value : 'desktop',
	}];
};

export const getVendorNameOptions = (deviceType) => {
	if (deviceType === 'existing') {
		return [{
			label : 'Micron Computers',
			value : 'micron_computers',
		},
		{
			label : 'Global System',
			value : 'global_systems',
		}];
	}

	if (deviceType === 'new') {
		return [{
			label : 'Team Computer',
			value : 'team_computer',
		},
		{
			label : 'Other',
			value : 'other',
		}];
	}

	return [];
};
