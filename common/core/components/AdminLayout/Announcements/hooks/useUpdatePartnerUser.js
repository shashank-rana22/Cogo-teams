import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdatePartnerUser = () => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : 'update_partner_user',
	}, { manual: true });

	const updatePartnerUser = async ({ id }) => {
		try {
			const payload = {
				id,
				is_joining_tnc_accepted: true,
			};

			await trigger({ data: payload });

			window.location.reload(true);
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	};

	return {
		updatePartnerUser,
		useUpdatePartnerUserloading: loading,
	};
};

export default useUpdatePartnerUser;
