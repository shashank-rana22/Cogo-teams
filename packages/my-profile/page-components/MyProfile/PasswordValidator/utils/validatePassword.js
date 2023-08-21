import getValidPasswordMappings from './getValidPasswordMapping';

const validatePassword = ({ value, errorMessage, t = () => {} }) => {
	const validPasswordMappings = getValidPasswordMappings(t);

	const isPasswordValid = Object.keys(validPasswordMappings).every((key) => {
		let isValid = false;
		if (key === 'minLength') {
			isValid = value.length >= validPasswordMappings[key].length;
		} else {
			isValid = value.split('').some((char) => validPasswordMappings[key].characters.includes(char));
		}

		return isValid;
	});

	return isPasswordValid ? true : errorMessage;
};

export default validatePassword;
