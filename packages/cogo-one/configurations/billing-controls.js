import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useState } from 'react';

const addAddressControls = () => {
	const geo = getGeoConstants();

	return [
		{
			label       : 'Billing Party Name',
			name        : 'name',
			type        : 'input',
			placeholder : 'Enter Billing Party Name',
			rules       : { required: 'required *' },
			span        : 6,
		},
		{
			label       : 'Address',
			name        : 'address',
			type        : 'input',
			placeholder : 'Enter Address',
			rules       : {
				required: 'required *',
			},
			span: 6,
		},
		{
			label       : 'Country',
			name        : 'country_id',
			type        : 'asyncSelect',
			placeholder : 'Enter Country',
			rules       : { required: 'required *' },
			span        : 6,
			params      : { filters: { type: ['country'] } },
			asyncKey    : 'list_locations',
		},
		{
			label       : 'Pincode',
			name        : 'pincode',
			type        : 'asyncSelect',
			placeholder : 'Enter Pincode',
			rules       : { required: 'required *' },
			span        : 6,
			params      : { filters: { type: ['pincode'] } },
			asyncKey    : 'list_locations',
			valueKey    : 'postal_code',
			labelKey    : 'display_name',
		},
		{
			label       : 'State',
			name        : 'state',
			type        : 'input',
			placeholder : 'Enter State',
			span        : 6,
			disabled    : true,
		},
		{
			label       : 'City',
			name        : 'city',
			type        : 'input',
			placeholder : 'Enter City',
			span        : 6,
			disabled    : true,
		},
		{
			label       : 'Tax Number',
			name        : 'tax_number',
			type        : 'input',
			placeholder : 'Enter Tax Number',
			span        : 6,
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
			span: 6,
		},
		{
			label       : 'POC Name',
			name        : 'poc_name',
			type        : 'input',
			placeholder : 'Enter POC Name',
			valueKey    : 'business_name',
			span        : 6,
		},
		{
			label       : 'Email Id',
			name        : 'email',
			type        : 'input',
			placeholder : 'Enter Email Id',
			span        : 6,
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
			span        : 6,
		},
	];
};

export const useGetControls = ({ setCityState = () => {} }) => {
	const [country, setCountry] = useState({});

	const controls = addAddressControls();

	return (controls || []).map((control) => {
		if (control.name === 'country_id') {
			return {
				...control,
				onChange: (_, obj) => {
					setCountry(obj);
				},
			};
		}
		if (control.name === 'pincode') {
			return {
				...control,
				params: {
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
			};
		}

		return {
			...control,
		};
	});
};
