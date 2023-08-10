import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMUpload } from '@cogoport/icons-react';

const uploadIcon = () => <IcMUpload height={20} width={20} />;

const getControls = (detailsData = {}) => [

	{
		name            : 'profile_picture_url',
		showProgress    : true,
		onlyURLOnChange : true,
		accept          : '.png, .jpeg',
		uploadType      : 'aws',
		validations     : [{ type: 'required', message: 'Mandatory' }],
		label           : 'Upload profile picture',
		drag            : true,
		height          : 72,
		uploadIcon,
		defaultValue    : detailsData?.picture,
		rules           : {
			required: 'Profile Picture is required',
		},
	},
	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		placeholder : 'Enter name',
		size        : 'md',
		value       : detailsData?.name,
		rules       : {
			required  : 'Please enter name',
			maxLength : {
				value   : 40,
				message : 'max length is 40',
			},
		},
	},
	{
		name        : 'preferred_languages',
		label       : 'Preferred Languages',
		placeholder : 'Choose Preferred Languages',
		options     : GLOBAL_CONSTANTS.languages,
		isClearable : true,

	},

];

export default getControls;
