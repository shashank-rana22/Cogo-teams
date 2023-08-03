import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const getPayload = ({ organization_id = '', user_id = '', lead_user_id = '' }) => ({
	user_id      : user_id || undefined,
	organization_id,
	lead_user_id : lead_user_id || undefined,
});

const useVerifyOmniChannelKyc = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/verify_omnichannel_kyc',
		method : 'post',
	}, { manual: true });

	const verifyKyc = ({ orgId, userId, leadUserId }) => {
		try {
			trigger({
				data: getPayload({ organization_id: orgId, user_id: userId, lead_user_id: leadUserId }),
			});
		} catch (error) {
			Toast.error(error.message);
		}
	};

	return { loading, verifyKyc, data };
};

export default useVerifyOmniChannelKyc;
