import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMUpload } from '@cogoport/icons-react';

function UploadIcon() {
	return <IcMUpload height={20} width={20} />;
}

const getControls = (detailsData = {}, t = () => {}) => [

	{
		name            : 'profile_picture_url',
		showProgress    : true,
		onlyURLOnChange : true,
		accept          : '.png, .jpeg',
		uploadType      : 'aws',
		validations     : [{ type: 'required', message: t('profile:profile_picture_url_validations_message') }],
		label           : t('profile:profile_picture_url_label'),
		drag            : true,
		height          : 72,
		uploadIcon      : UploadIcon(),
		defaultValue    : detailsData?.picture,
		rules           : {
			required: t('profile:profile_picture_url_rules_required'),
		},
	},
	{
		name        : 'name',
		label       : t('profile:name'),
		type        : 'text',
		placeholder : t('profile:name_placeholder'),
		size        : 'md',
		value       : detailsData?.name,
		rules       : {
			required  : t('profile:name_rules_required'),
			maxLength : {
				value   : 40,
				message : t('profile:name_pattern_message'),
			},
		},
	},
	{
		name        : 'preferred_languages',
		label       : t('profile:preferred_languages'),
		placeholder : t('profile:preferred_languages_placeholder'),
		options     : GLOBAL_CONSTANTS.languages,
		isClearable : true,

	},

];

export default getControls;
