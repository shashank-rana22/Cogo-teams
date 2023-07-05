import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import getCustomAuthParams from './getCustomAuthParams';

const useUpdatePartnerUser = () => {
	const profile = useSelector((state) => state.profile || {});
	const { permissions_navigations = {} } = profile || {};

	const URL = '/update_partner_user';
	const customAuthParams = getCustomAuthParams({ permissions_navigations, URL });

	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : URL,
		customAuthParams,
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
