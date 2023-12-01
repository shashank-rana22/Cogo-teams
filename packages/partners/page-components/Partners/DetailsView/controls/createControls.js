/* eslint-disable max-lines-per-function */
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	CountrySpecificData,
	getCountrySpecificData,
} from '@cogoport/globalization/utils/CountrySpecificDetail';
import { IcMLocation } from '@cogoport/icons-react';

import countries from '../../../../helpers/countries.json';

import styles from './styles.module.css';

const geo = getGeoConstants();
const getCreateFormControls = ({ entityType = 'channel_partner' }) => {
	const ifChannelPartner = (valueIfTrue, valueIfFalse) => {
		if (entityType === 'channel_partner') {
			return valueIfTrue;
		}
		return valueIfFalse;
	};
	const COUNTRIES_OPTIONS = [];
	(countries || []).forEach((country) => {
		COUNTRIES_OPTIONS.push(
			{
				label     : country.name,
				value     : country.country_id,
				flag_icon : country.flag_icon_url,
			},
		);
	});
	const TWO = 2;
	const ONE = 1;
	const getInitials = (name) => {
		if (name) {
			const full_name = name.split(' ');
			const initials = full_name.map((char) => char.charAt(GLOBAL_CONSTANTS.zeroth_index).toUpperCase());
			return initials.length > TWO ? initials.splice(GLOBAL_CONSTANTS.zeroth_index, TWO) : initials;
		}
		return '';
	};
	const getCity = (name) => {
		if (name) {
			const full_address = name.split(',');
			const first_name = full_address[GLOBAL_CONSTANTS.zeroth_index];
			const city_pin = first_name.split('-');
			if (city_pin.length < TWO) {
				return '--';
			}
			return city_pin[ONE];
		}
		return '';
	};

	const getCountry = (name) => {
		if (name) {
			const full_address = name.split(',');
			const state = full_address[ONE] || '';
			const country = full_address[TWO] || '';
			return `${state},${country}`;
		}
		return '';
	};
	const controls = [
		{
			name        : 'business_name',
			label       : 'Business Name',
			type        : 'text',
			span        : 12,
			placeholder : 'Please enter the business name...',
			rules       : { required: 'Business Name is required' },
			size        : 'sm',
		},
		{
			name        : 'country_id',
			label       : 'Country',
			type        : 'select',
			options     : COUNTRIES_OPTIONS,
			span        : 12,
			multiple    : false,
			size        : 'sm',
			placeholder : 'Please select your country...',
			rules       : { required: 'Country is required' },
			renderLabel : (item) => (
				<div className={styles.countries}>
					<div className={styles.country_label}>{item?.label}</div>
					{item.flag_icon ? <img src={item?.flag_icon} alt="flag icon" />
						: (
							<div className={styles.avatar}>
								{getInitials(item?.label)}
								{' '}
							</div>
						)}
				</div>
			),
			isClearable: true,
		},
		...ifChannelPartner(
			[
				{
					name        : 'entity_manager_id',
					label       : 'Relationship Manager',
					span        : 12,
					type        : 'async_select',
					caret       : true,
					placeholder : 'Select User',
					asyncKey    : 'partner_users',
					labelKey    : 'name',
					valueKey    : 'user_id',
					size        : 'sm',
					isClearable : true,
				},
			],
			[
				{
					name     : 'selected_role_ids',
					label    : 'Select Default roles',
					type     : 'async_select',
					asyncKey : 'partner_roles',
					span     : 12,
					size     : 'sm',
					multiple : true,
					params   : {
						filters: {
							role_type      : 'default',
							stakeholder_id : geo.uuid.parent_entity_id,
						},
					},
					placeholder : 'Please select roles...',
					rules       : { required: 'Default Roles is required' },
				},
			],
		),
		{
			name        : 'registration_number',
			label       : 'Registration Number',
			type        : 'text',
			span        : 12,
			placeholder : 'Please enter the registration number...',
			rules       : { required: 'Registration Number is required' },
			size        : 'sm',
		},
		...ifChannelPartner(
			[
				{
					name            : 'utility_bill_document_url',
					label           : 'Address Proof',
					type            : 'upload',
					showProgress    : true,
					span            : 12,
					onlyURLOnChange : true,
					docName         : 'Utility Bill',
					dropareaProps   : {
						heading    : 'Drop your file here, or browse',
						subHeading : 'supports - Image, pdf, doc',
					},
					size: 'sm',
					accept:
						'image/*,.pdf,.doc,.docx,application/msword,application/'
                        + 'vnd.openxmlformats-officedocument.wordprocessingml.document',
				},
				{
					name            : 'agreement',
					label           : 'Signed Agreement',
					type            : 'upload',
					showProgress    : true,
					onlyURLOnChange : true,
					span            : 12,
					docName         : 'Signed Agreement',
					dropareaProps   : {
						heading    : 'Drop your file here, or browse',
						subHeading : 'supports - Image, pdf, doc',
					},
					size: 'sm',
					accept:
						'image/*,.pdf,.doc,.docx,application/msword,application/'
                        + 'vnd.openxmlformats-officedocument.wordprocessingml.document',
				},
				{
					name            : 'logo',
					label           : 'Logo Url',
					type            : 'upload',
					showProgress    : true,
					onlyURLOnChange : true,
					span            : 12,
					accept          : 'image/*,.pdf',
					dropareaProps   : {
						heading    : 'Drop your file here, or browse',
						subHeading : 'supports - Image, pdf',
					},
					size: 'sm',
				},
				{
					name        : 'remarks',
					type        : 'textarea',
					label       : 'Remarks',
					span        : 12,
					size        : 'sm',
					placeholder : 'Add Remarks....',
				},
				{
					name        : 'address',
					type        : 'text',
					label       : 'Address',
					span        : 12,
					size        : 'sm',
					rules       : { required: 'Address is required' },
					placeholder : 'Add address...',
				},
				{
					name  : 'tax_number',
					type  : 'text',
					span  : 12,
					size  : 'sm',
					label : (
						<>
							<CountrySpecificData
								country_id={geo.country.id}
								accessorType="registration_number"
								accessor="label"
							/>
							{' '}
							Number
						</>
					),
					rules: {

						required: `${getCountrySpecificData({
							country_id   : geo.country.id,
							accessorType : 'registration_number',
							accessor     : 'label',
						})} is required`,
						pattern: {
							value   : geo.regex.GST,
							message : `Need Valid ${getCountrySpecificData({
								country_id   : geo.country.id,
								accessorType : 'registration_number',
								accessor     : 'label',
							})}} format`,
						},

					},
				},
				{
					name        : 'pincode',
					type        : 'async_select',
					asyncKey    : 'list_locations',
					params      : { filters: { type: ['pincode'] } },
					multiple    : false,
					span        : 12,
					size        : 'sm',
					label       : 'Zipcode / Pincode *',
					placeholder : 'Select Pincode / Zipcode',
					valueKey    : 'postal_code',
					labelKey    : 'postal_code',
					isClearable : true,
					rules:
						{
							type     : 'required',
							required : 'Pincode',
						},
					renderLabel: (item) => (
						<div className={styles.location}>
							<IcMLocation fill="rgb(64, 151, 245)" height="20" width="20" />
							<div className={styles.location_name}>
								<div className={styles.name}>{getCity(item.display_name)}</div>
								<div className={styles.loc_display_name}>{getCountry(item.display_name)}</div>
							</div>
							<div>{item.postal_code}</div>
						</div>
					),
				},
				{
					label : 'Users',
					span  : 12,
				},
				{
					name        : 'users',
					type        : 'fieldArray',
					showButtons : true,
					size        : 'sm',
					buttonText  : 'Add new User',
					value       : {
						name  : '',
						email : '',
					},
					noDeleteButtonTill : 1,
					controls           : [
						{
							name        : 'name',
							label       : 'Name',
							type        : 'text',
							span        : 12,
							placeholder : "User's name",
							lowerLabel  : 'This user will become superadmin',
							rules       : { required: 'Name is required' },
						},
						{
							name        : 'email',
							label       : 'Email',
							type        : 'email',
							span        : 12,
							placeholder : "User's email",
							rules       : {
								required : 'Email is required',
								pattern  : {
									value   : geo.regex.EMAIL,
									message : 'Please enter a valid Email ID',
								},
							},
						},
						{
							name        : 'phone_number',
							label       : 'Mobile Number',
							type        : 'mobile-number-select',
							span        : 12,
							codeKey     : 'mobile_country_code',
							numberKey   : 'mobile_number',
							themeType   : 'secondary',
							placeholder : "User's Mobile Number",
							value       : {
								mobile_country_code : '+91',
								mobile_number       : '',
							},
							rules:
								{ required: 'Mobile Number is required' },
						},
					],
				},
			],
			[],
		),
	];
	return {
		controls,
	};
};

export default getCreateFormControls;
