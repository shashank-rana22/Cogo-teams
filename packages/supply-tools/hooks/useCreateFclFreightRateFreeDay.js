import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getCreateFclRatePayload from '../helpers/getCreateFclRatePayload';
import toastApiError from '../utils/toastApiError';

const useCreateFclFreightRateFreeDay = ({
	successMessage = 'Created Successfully!',
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_fcl_freight_rate_free_day',
		method : 'POST',
	});

	const apiTrigger = async (val) => {
		try {
			const payload = getCreateFclRatePayload({ data: val });

			const res = await trigger({ data: payload });

			Toast.success(successMessage);
			refetch();
			return res;
		} catch (err) {
			toastApiError(err);
			return err;
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useCreateFclFreightRateFreeDay;
