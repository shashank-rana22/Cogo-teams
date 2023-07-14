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

export const SURRENDER_OPTIONS = [
	{
		label : 'Buying a new laptop from our vendor',
		value : 'buying_new_laptop_from_our_vendor',
	},
	{
		label : 'Buying a new laptop from outside',
		value : 'buying_new_laptop_from_outside',
	},
	{
		label : 'Bringing your device',
		value : 'bring_your_device',
	},
	{
		label : 'Does not apply to me',
		value : 'not_applicable_to_me',
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
];

export const DEVICE_OPTIONS = [
	{
		label : 'Existing Laptop',
		value : 'existing_laptop',
	},
	{
		label : 'New Laptop',
		value : 'new_laptop',
	},
];

export const getVendorNameOptions = (deviceType) => {
	if (deviceType === 'existing_laptop') {
		return [{
			label : 'Micron Computers',
			value : 'micron_computers',
		},
		{
			label : 'Global System',
			value : 'global_systems',
		}];
	}

	if (deviceType === 'new_laptop') {
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

export const HRBP_TAB_OPTIONS = [
	{
		label : 'Pending',
		value : 'active',
	},
	{
		label : 'Verified',
		value : 'verified',
	},
	{
		label : 'Rejected',
		value : 'rejected_by_hr',
	},
];

export const ADMIN_TAB_OPTIONS = [
	{
		label : 'Pending',
		value : 'verified',
	},
	{
		label : 'Approved',
		value : 'approved',
	},
	{
		label : 'Rejected',
		value : 'rejected_by_admin',
	},
];
