import countries from '../../../../helpers/countries.json';

const getUpdateFormControls = ({ entityType = 'channel_partner' }) => {
	const ifChannelPartner = (y, n) => (entityType === 'channel_partner' ? y : n);
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

	const controls = [
		...ifChannelPartner(
			[
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
						<div>{item.label}</div>
					),
					isClearable: true,
				},
			],
			[],
		),
		{
			name           : 'selected_role_ids',
			label          : 'Select Default roles',
			type           : 'async_select',
			asyncKey       : 'partner_roles',
			span           : 12,
			size           : 'lg',
			multiple       : true,
			defaultOptions : true,
			placeholder    : 'Please select roles...',
			rules          : { required: 'Default Roles is required' },
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
				{
					name            : 'business_address_proof',
					label           : 'Address Proof',
					type            : 'upload',
					showProgress    : true,
					span            : 12,
					onlyURLOnChange : true,
					docName         : 'Business Address',
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
			],
			[],
		),
	];

	return {
		controls,
	};
};

export default getUpdateFormControls;
