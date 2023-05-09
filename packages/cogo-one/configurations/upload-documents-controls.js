import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

// eslint-disable-next-line
import countries from '../../../.data-store/constants/countries.json';

const getControls = (fileType = '') => {
	const indiaOption = countries.find(
		(country) => country.country_code === 'IN',
	);

	const countryOptions = [{
		label : indiaOption?.name,
		value : indiaOption?.id,
	}];

	countries.filter((country) => country.country_code !== 'IN').map((country) => {
		const option = { label: country.name, value: country.id };
		countryOptions.push(option);
		return countryOptions;
	});

	const controls = {
		utility_bill_document_url: {
			name   : 'utility_bill_document_url',
			type   : 'file',
			accept : 'image/*,.pdf,.doc,.docx',
			rules  : {
				required: 'Business address Proof is required',
			},
		},
		country_id: {
			name    : 'country_id',
			type    : 'select',
			options : countryOptions,
			rules   : {
				required: 'Registration country is required',
			},
		},
		registration_number: {
			name  : 'registration_number',
			type  : 'input',
			rules : {
				required : `${fileType === 'pan' ? 'PAN' : 'GST'} Number is required`,
				pattern  : {
					value   : fileType === 'pan' ? geo.regex.PAN : geo.regex.GST,
					message : `Enter a valid ${fileType === 'pan' ? 'PAN' : 'GST'} number`,
				},
			},
		},
		preferred_languages: {
			name 	: 'preferred_languages',
			type  : 'select',
			rules : {
				required: 'Preferred languages is required',
			},
			multiple    : true,
			isClearable : true,
			options     : [
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
			],
		},
	};

	return controls;
};

export default getControls;
