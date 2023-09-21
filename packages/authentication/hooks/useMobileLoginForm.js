import { useState } from 'react';

import { checkMobileInput } from '../utils/check-mobile-input';

const useMobileLoginForm = ({ onSendOtp = () => {}, t = () => {} }) => {
	const [customError, setCustomError] = useState('');

	const onOtpApiCall = (values, e) => {
		const hasValues = checkMobileInput({ mobNumberObj: values?.mobile_number });

		if (hasValues) {
			setCustomError('');
			onSendOtp(values, e);
		} else {
			setCustomError(t('login:loginField_mobile_error'));
		}
	};

	return {
		customError,
		onOtpApiCall,
	};
};

export default useMobileLoginForm;
