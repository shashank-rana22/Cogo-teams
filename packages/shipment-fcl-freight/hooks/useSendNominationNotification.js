import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useSendNominationNotification = ({
	refetch = () => {},
	successMessage = 'Successfully Updated',
}) => {
	const [response, setResponse] = useState();
	const [{ loading }, trigger] = useRequest({
		url    : '/send_nomination_notification',
		method : 'POST',
	});

	const apiTrigger = async (payload) => {
		try {
			const res = await trigger({ data: payload });
			Toast.success(successMessage);
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

export default useSendNominationNotification;
