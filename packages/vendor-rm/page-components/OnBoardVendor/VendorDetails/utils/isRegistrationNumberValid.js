// eslint-disable-next-line import/no-relative-packages
import registrationNumbersMapping from '../../../../../../common/utils/registrationNumbersMapping';

const isRegistrationNumberValid = ({
	registrationNumber = '',
	registrationType = '',
}) => {
	if (!registrationType) {
		return false;
	}

	const { pattern } = registrationNumbersMapping[registrationType];

	const REGEX = new RegExp(pattern);

	return registrationNumber.match(REGEX);
};

export default isRegistrationNumberValid;
