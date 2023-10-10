import languageMapping from '../constants/languageLocaleMapping';

const getLanguageSpecifications = ({ locale = '', accessor = '' }) => {
	const fontFamily = locale in languageMapping
		? languageMapping[locale][accessor] : languageMapping.en[accessor];

	return fontFamily;
};

export default getLanguageSpecifications;
