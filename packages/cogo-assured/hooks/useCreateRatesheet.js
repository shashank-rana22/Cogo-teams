import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getCreateUpdateRatesheetPayload from '../helpers/getCreateUpdateRatesheetPayload';
import toastApiError from '../utils/toastApiError';

const useCreateRatesheet = ({
	successMessage = 'Created Successfully!',
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_cogo_assured_rate_sheet',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const payload = getCreateUpdateRatesheetPayload(val);
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

export default useCreateRatesheet;
