import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import getUpdateFclRatePayload from '../helpers/getUpdateFclRatePayload';
import toastApiError from '../utils/toastApiError';

const useUpdateFclFreightRateFreeDay = ({
	successMessage = 'Updated Successfully!',
	refetch = () => {},
}) => {
	const user_profile = useSelector(({ profile }) => profile.user || {});

	const [{ loading }, trigger] = useRequest({
		url    : '/update_fcl_freight_rate_free_day',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async ({ data, item, callBack = () => {} }) => {
		try {
			const payload = getUpdateFclRatePayload({ data, item, user_profile });

			const res = await trigger({ data: payload });

			refetch();

			callBack(res);

			Toast.success(successMessage);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useUpdateFclFreightRateFreeDay;
