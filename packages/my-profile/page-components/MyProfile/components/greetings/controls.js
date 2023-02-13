import { IcMUpload } from '@cogoport/icons-react';

import options from './utils/languageOptions';

const uploadIcon = () => <IcMUpload height={20} width={20} />;

const getControls = (detailsData) => [

	{
		name            : 'profile_picture_url',
		showProgress    : true,
		onlyURLOnChange : true,
		accept          : '.png, .jpeg',
		uploadType      : 'aws',
		validations     : [{ type: 'required', message: 'Mandatory' }],

		label  : 'Upload profile picture',
		drag   : true,
		height : 72,
		uploadIcon,
		value  : detailsData?.picture,
		rules  : {
			required: true,
		},
		span: 12,
	},

	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		span        : 6,
		placeholder : 'Enter name',
		size        : 'md',
		value       : detailsData?.name,
		rules       : { required: 'Required' },
	},

	{
		name        : 'email',
		label       : 'Email',
		type        : 'text',
		span        : 12,
		placeholder : 'Enter name',
		value       : detailsData?.email,
		rules       : { required: 'Required' },
	},

	{
		name        : 'mobileNumber',
		label       : 'Mobile Number',
		type        : 'mobile-number-select',
		inputType   : 'number',
		placeholder : 'Mobile Number*',
		span        : 12,
		rules       : { required: true },
	},

	{
		name        : 'preferred_languages',
		label       : 'Languages',
		span        : 12,
		// multiple    : true,
		type        : 'multi-select',
		placeholder : 'Select languages',
		options,
		value       : detailsData?.preferred_languages,
		rules       : { required: true },

	},

];

export default getControls;
