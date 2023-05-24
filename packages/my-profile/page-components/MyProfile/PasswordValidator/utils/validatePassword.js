import VALID_PASSWORD_MAPPINGS from './getValidPasswordMapping';

const validatePassword = ({ value, errorMessage }) => {
	const isPasswordValid = Object.keys(VALID_PASSWORD_MAPPINGS).every((key) => {
		let isValid = false;
		if (key === 'minLength') {
			isValid = value.length >= VALID_PASSWORD_MAPPINGS[key].length;
		} else {
			isValid = value.split('').some((char) => VALID_PASSWORD_MAPPINGS[key].characters.includes(char));
		}

		return isValid;
	});

	return isPasswordValid ? true : errorMessage;
};

export default validatePassword;
