import getPanHolderStatus from '@cogoport/forms/utils/getPanHolderStatus';
import registrationNumbersMapping from '@cogoport/forms/utils/registrationNumbersMapping';

import getPanFromGst from '../../../../utils/getPanFromGst';

const useOnBlurTaxPanGstinControl = ({
	setValue = () => {},
	isValidateRegistration,
}) => {
	const onBlurTaxPanGstinControl = ({
		registrationNumber,
		registrationType,
	}) => {
		if (isValidateRegistration) {
			const { length = '' } =	registrationNumbersMapping[registrationType] || {};

			const flag = registrationNumber.length === length;

			if (!flag) {
				return;
			}

			const pan = getPanFromGst(registrationNumber);
			const panStatus = getPanHolderStatus(pan);

			setValue('company_type', panStatus);
		}
	};

	return {
		onBlurTaxPanGstinControl,
	};
};

export default useOnBlurTaxPanGstinControl;
