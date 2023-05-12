import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateCommunication = ({ referrerNetworkNode = () => {} }) => {
	const { ...profile } = useSelector((state) => state?.profile);

	const user_id = profile?.user?.id;

	const [{ loading: pingLoading }, trigger] = useRequest({
		url    : '/create_communication',
		method : 'post',
	}, { manual: true });

	const createCommunication = async ({ email = '', id: refereeId = '' }) => {
		try {
			await trigger({
				params: {
					sender         : 'no-reply@cogoport.com',
					recipient      : email,
					sender_user_id : user_id,
					provider_name  : 'aws',
					template_name  : 'referral_reminder_email',
					service        : 'User',
					service_id     : refereeId,
					user_id        : refereeId,
					type           : 'email',
				},
			});
			Toast.success('Email sent successfully!');
			referrerNetworkNode();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		createCommunication,
		pingLoading,
	};
};

export default useCreateCommunication;
