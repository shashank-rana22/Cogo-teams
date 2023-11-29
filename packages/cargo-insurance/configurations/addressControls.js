import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getAddressControls = ({ t, includeTax = false, country, setValue, showPocFields, setShowPocFeilds }) => [
	{
		name        : 'name',
		label       : t('cargoInsurance:address_control_name'),
		type        : 'text',
		placeholder : t('cargoInsurance:address_control_name_placeholder'),
		rules       : { required: 'required *' },
	},
	{
		name        : 'address',
		label       : t('cargoInsurance:address_control_address'),
		type        : 'text',
		placeholder : t('cargoInsurance:address_control_address_placeholder'),
		rules       : {
			required: 'required *',
		},
	},
	{
		name        : 'country',
		label       : t('cargoInsurance:address_control_country'),
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		placeholder : t('cargoInsurance:address_control_country_placeholder'),
		initialCall : true,
		params      : { filters: { type: ['country'] } },
		rules       : {
			required: 'required *',
		},
	},
	{
		name        : 'pincode',
		label       : t('cargoInsurance:address_control_pincode'),
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		placeholder : t('cargoInsurance:address_control_pincode_placeholder'),
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
		label       : t('cargoInsurance:address_control_state'),
		type        : 'text',
		placeholder : t('cargoInsurance:address_control_state_placeholder'),
		disabled    : true,
	},
	{
		name        : 'city',
		label       : t('cargoInsurance:address_control_city'),
		type        : 'text',
		placeholder : t('cargoInsurance:address_control_city_placeholder'),
		disabled    : true,
	},
	{
		name  : 'includeTax',
		label : t('cargoInsurance:address_control_include_tax'),
		type  : 'checkbox',
	},
	{
		name    : 'address_type',
		label   : t('cargoInsurance:address_control_address_type'),
		type    : 'chips',
		options : [
			{ children: t('cargoInsurance:address_control_address_type_opt1'), key: 'factory' },
			{ children: t('cargoInsurance:address_control_address_type_opt2'), key: 'office' },
			{ children: t('cargoInsurance:address_control_address_type_opt3'), key: 'warehouse' },
		],
		multiple : false,
		rules    : {
			required: 'required *',
		},
		showEle: !includeTax,
	},
	{
		name        : 'tax_number',
		label       : t('cargoInsurance:address_control_tax'),
		type        : 'text',
		placeholder : t('cargoInsurance:address_control_tax_placeholder'),
		showEle     : includeTax,
		rules       : {
			required: 'required *',
		},
		extraComp: (
			<Button size="sm" themeType="accent" onClick={() => setShowPocFeilds((prev) => !prev)}>
				{!showPocFields ? t('cargoInsurance:add_poc') : t('cargoInsurance:remove_poc')}
			</Button>
		),
	},
	{
		name        : 'poc_name',
		label       : t('cargoInsurance:address_control_poc_name'),
		type        : 'text',
		placeholder : t('cargoInsurance:address_control_poc_name_placeholder'),
		showEle     : showPocFields,
	},
	{
		name        : 'email',
		label       : t('cargoInsurance:address_control_email'),
		type        : 'text',
		placeholder : t('cargoInsurance:address_control_email_placeholder'),
		showEle     : showPocFields,
		rules       : {
			pattern: {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : t('cargoInsurance:address_control_email_invalid'),
			},
		},

	},
	{
		name        : 'phoneNumber',
		label       : t('cargoInsurance:address_control_mobile'),
		type        : 'mobileSelect',
		placeholder : t('cargoInsurance:address_control_mobile_placeholder'),
		showEle     : showPocFields,

	},
];

export default getAddressControls;
