import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useSendNominationNotification = ({
	refetch = () => {},
	successMessage = 'Successfully Updated',
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/send_nomination_notification',
		method : 'POST',
	});

	const apiTrigger = async (payload) => {
		try {
			await trigger({ data: payload });
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
		data,
	};
};

export default useSendNominationNotification;
