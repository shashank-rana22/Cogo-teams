import { isEmpty } from '@cogoport/utils';

const getErrors = ({ selectedServices = [], paymentModesArray = [] }) => {
	if (isEmpty(selectedServices)) {
		return { hasError: true, message: 'Please select atleast one service' };
	}

	if (paymentModesArray.some((item) => isEmpty(item))) {
		return { hasError: true, message: 'Invalid payment details' };
	}

	return { hasError: false, message: '' };
};

export default getErrors;
