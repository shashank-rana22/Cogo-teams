import { IcMUpload } from '@cogoport/icons-react';

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
];

export default getControls;
