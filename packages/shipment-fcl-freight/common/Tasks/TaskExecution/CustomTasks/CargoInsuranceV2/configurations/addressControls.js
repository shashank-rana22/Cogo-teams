import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getAddressControls = ({ includeTax = false, country, setValue, showPocFields, setShowPocFeilds }) => [
	{
		name        : 'name',
		label       : 'Billing Party Name',
		type        : 'text',
		placeholder : 'Enter Billing Party Name',
		rules       : { required: 'required *' },
	},
	{
		name        : 'address',
		label       : 'Address',
		type        : 'text',
		placeholder : 'Enter Address',
		rules       : {
			required: 'required *',
		},
	},
	{
		name        : 'country',
		label       : 'Country',
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		placeholder : 'Select Country',
		initialCall : true,
		params      : { filters: { type: ['country'] } },
		rules       : {
			required: 'required *',
		},
	},
	{
		name        : 'pincode',
		label       : 'Pincode',
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		placeholder : 'Select Pincode',
		disabled    : !country,
		params      : {
			filters  : { type: ['pincode'], country_id: country },
			includes : { region: true, city: true },
		},
		labelKey : 'display_name',
		valueKey : 'postal_code',
		onChange : (val, obj) => {
			const { region, city } = obj || {};
			setValue('state', region?.name);
			setValue('city', city?.name);
		},
		rules: {
			required: 'required *',
		},
	},
	{
		name        : 'state',
		label       : 'State',
		type        : 'text',
		placeholder : 'Enter State',
		disabled    : true,
	},
	{
		name        : 'city',
		label       : 'City',
		type        : 'text',
		placeholder : 'Enter City',
		disabled    : true,
	},
	{
		name  : 'includeTax',
		label : 'Include Tax Number',
		type  : 'checkbox',
	},
	{
		name    : 'address_type',
		label   : 'Save Address as',
		type    : 'chips',
		options : [
			{ children: 'Factory', key: 'factory' },
			{ children: 'Office', key: 'office' },
			{ children: 'Ware House', key: 'warehouse' },
		],
		multiple : false,
		rules    : {
			required: 'required *',
		},
		showEle: !includeTax,
	},
	{
		name        : 'tax_number',
		label       : 'Tax Number',
		type        : 'text',
		placeholder : 'Enter Tax Number',
		showEle     : includeTax,
		rules       : {
			required: 'required *',
		},
		extraComp: (
			<Button size="sm" themeType="accent" onClick={() => setShowPocFeilds((prev) => !prev)}>
				{!showPocFields ? 'Add POC' : 'Remove POC'}
			</Button>
		),
	},
	{
		name        : 'poc_name',
		label       : 'POC Name',
		type        : 'text',
		placeholder : 'Enter POC Name',
		showEle     : showPocFields,
	},
	{
		name        : 'email',
		label       : 'Email Id',
		type        : 'text',
		placeholder : 'Enter Email Id',
		showEle     : showPocFields,
		rules       : {
			pattern: {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : 'Email Id is Invalid',
			},
		},

	},
	{
		name        : 'phoneNumber',
		label       : 'Phone Number',
		type        : 'mobileSelect',
		placeholder : 'Enter Phone Number',
		showEle     : showPocFields,

	},
];

export default getAddressControls;
