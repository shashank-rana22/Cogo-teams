import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useState } from 'react';

const useGetControls = ({ setCityState = () => {} }) => {
	const geo = getGeoConstants();

	const [country, setCountry] = useState({});

	return [
		{
			label       : 'Billing Party Name',
			name        : 'name',
			type        : 'input',
			placeholder : 'Enter Billing Party Name',
			rules       : { required: 'required *' },
		},
		{
			label       : 'Address',
			name        : 'address',
			type        : 'input',
			placeholder : 'Enter Address',
			rules       : {
				required: 'required *',
			},
		},
		{
			label       : 'Country',
			name        : 'country_id',
			type        : 'asyncSelect',
			placeholder : 'Enter Country',
			rules       : { required: 'required *' },
			params      : { filters: { type: ['country'] } },
			asyncKey    : 'list_locations',
			onChange    : (_, obj) => {
				setCountry(obj);
			},
		},
		{
			label       : 'Pincode',
			name        : 'pincode',
			type        : 'asyncSelect',
			placeholder : 'Enter Pincode',
			rules       : { required: 'required *' },
			asyncKey    : 'list_locations',
			valueKey    : 'postal_code',
			labelKey    : 'display_name',
			params      : {
				filters: {
					type       : 'pincode',
					country_id : country?.id,
				},
				includes: {
					country                 : '',
					region                  : '',
					city                    : '',
					default_params_required : true,
				},
			},
			onChange: (_, obj) => {
				setCityState({
					city  : obj?.city?.name,
					state : obj?.region?.name,
				});
			},
		},
		{
			label       : 'State',
			name        : 'state',
			type        : 'input',
			placeholder : 'Enter State',
			disabled    : true,
		},
		{
			label       : 'City',
			name        : 'city',
			type        : 'input',
			placeholder : 'Enter City',
			disabled    : true,
		},
		{
			label       : 'Tax Number',
			name        : 'tax_number',
			type        : 'input',
			placeholder : 'Enter Tax Number',
			rules       : {
				required: true,
			},
		},
		{
			label : 'Include Tax Number',
			name  : 'include_tax_number',
			type  : 'checkbox',
		},
		{
			name    : 'address_type',
			type    : 'chips',
			value   : 'office',
			options : [
				{
					children : 'Factory',
					key      : 'factory',
				},
				{
					children : 'Office',
					key      : 'office',
				},
				{
					children : 'Ware House',
					key      : 'warehouse',
				},
			],
		},
		{
			label       : 'POC Name',
			name        : 'poc_name',
			type        : 'input',
			placeholder : 'Enter POC Name',
			valueKey    : 'business_name',
		},
		{
			label       : 'Email Id',
			name        : 'email',
			type        : 'input',
			placeholder : 'Enter Email Id',
			rules       : {
				pattern: {
					value   : geo.regex.EMAIL,
					message : 'Invalid email address',
				},
			},
		},
		{
			label       : 'Phone Number',
			name        : 'phone_number',
			type        : 'mobile_number',
			placeholder : 'Enter Phone Number',
		},
	];
};

export default useGetControls;
