import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useSendRequirementEmail = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_rolling_forecast_requirement_email',
		method : 'POST',
	}, { manual: true });

	const sendRequirementEmail = async ({ payload = {} }) => {
		try {
			const response = await trigger({
				params: payload,
			});
			return response;
		} catch (error) {
			Toast.error(error || 'Something went wrong');
		}
		return null;
	};

	return {
		sendRequirementEmail,
		loading,
	};
};

export default useSendRequirementEmail;
