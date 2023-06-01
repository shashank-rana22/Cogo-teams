import { IcMUpload } from '@cogoport/icons-react';

const uploadIcon = () => <IcMUpload height={20} width={20} />;

const LANGUAGE_OPTIONS = [
	{ value: 'english', label: 'English' },
	{ value: 'spanish', label: 'Spanish' },
	{ value: 'mandarin_chinese', label: 'Mandarin chinese' },
	{ value: 'arabic', label: 'العربية, Arabic' },
	{ value: 'bengali', label: 'বাংলা' },
	{ value: 'hindi', label: 'हिन्दी' },
	{ value: 'russian', label: 'русский язык,Russian' },
	{ value: 'portuguese', label: 'Português' },
	{ value: 'japanese', label: '日本語 (にほんご／にっぽんご)' },
	{ value: 'german', label: 'Deutsch' },
	{ value: 'wu_chinese', label: 'Wu chinese' },
	{ value: 'javanese', label: 'basa Jawa' },
	{ value: 'korean', label: '한국어 (韓國語), 조선말 (朝鮮語)' },
	{ value: 'french', label: 'français, langue française' },
	{ value: 'turkish', label: 'Türkçe' },
	{ value: 'vietnamese', label: 'Tiếng Việt' },
	{ value: 'telugu', label: 'తెలుగు' },
	{ value: 'yue_chinese', label: 'Yue chinese' },
	{ value: 'marathi', label: 'मराठी' },
	{ value: 'tamil', label: 'தமிழ்' },
	{ value: 'italian', label: 'Italiano' },
	{ value: 'urdu', label: 'اردو' },
	{ value: 'minnan_chinese', label: 'Minnan chinese' },
	{ value: 'jinyu_chinese', label: 'Jinyu chinese' },
	{ value: 'gujarati', label: 'ગુજરાતી' },
	{ value: 'polish', label: 'polski' },
	{ value: 'ukrainian', label: 'українська' },
	{ value: 'persian', label: 'فارسی' },
	{ value: 'xiang_chinese', label: 'Xiang chinese' },
	{ value: 'malayalam', label: 'മലയാളം' },
	{ value: 'hakka_chinese', label: 'Hakka chinese' },
	{ value: 'kannada', label: 'ಕನ್ನಡ' },
	{ value: 'oriya', label: 'ଓଡ଼ିଆ' },
	{ value: 'western_punjabi', label: 'Western punjabi' },
	{ value: 'sunda', label: 'Sunda' },
	{ value: 'eastern_punjabi', label: 'Eastern punjabi' },
	{ value: 'romanian', label: 'română' },
	{ value: 'dutch', label: 'Nederlands, Vlaams' },
	{ value: 'assamese', label: 'অসমীয়া' },
];

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
		options     : LANGUAGE_OPTIONS,

	},

];

export default getControls;
