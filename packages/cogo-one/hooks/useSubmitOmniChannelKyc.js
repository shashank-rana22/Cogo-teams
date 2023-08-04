import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const getPayload = ({ organization_id = '', user_id = '', lead_user_id = '' }) => ({
	user_id      : user_id || undefined,
	organization_id,
	lead_user_id : lead_user_id || undefined,
});

const useSubmitOmniChannelKyc = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/submit_omnichannel_kyc',
		method : 'post',
	}, { manual: true });

	const submitKyc = async ({ orgId = '', userId = '', leadUserId = '', fetchOrganization = () => {} }) => {
		try {
			await trigger({
				data: getPayload({ organization_id: orgId, user_id: userId, lead_user_id: leadUserId }),
			});
			fetchOrganization();
		} catch (error) {
			Toast.error(error.message);
		}
	};

	return { loading, submitKyc, data };
};

export default useSubmitOmniChannelKyc;
