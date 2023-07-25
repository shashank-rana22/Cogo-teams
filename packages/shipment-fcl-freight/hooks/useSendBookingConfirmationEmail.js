import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useSendBookingConfirmationEmail = ({
	refetch = () => {},
	successMessage = 'Email Successfully Send',
}) => {
	const [response, setResponse] = useState('');

	const [{ loading }, trigger] = useRequest({
		url    : '/send_booking_confirmation_mail',
		method : 'POST',
	});

	const apiTrigger = async (payload) => {
		try {
			const res = await trigger({ data: payload });

			if (!payload?.show_preview_only) {
				Toast.success(successMessage);
			}
			refetch();
			setResponse(res?.data);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
		response,
	};
};

export default useSendBookingConfirmationEmail;
