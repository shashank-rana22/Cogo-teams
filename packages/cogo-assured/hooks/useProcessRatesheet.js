import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getProcessRatesheetPayload from '../helpers/getProcessRatesheetPayload';
import toastApiError from '../utils/toastApiError';

const useProcessRatesheet = ({
	successMessage = 'Processed successfully!',
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/process_cogo_assured_rate_sheet',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const payload = await getProcessRatesheetPayload({ values: val?.value });

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

export default useProcessRatesheet;
