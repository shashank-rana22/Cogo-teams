import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

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
			await trigger({ data: val });

			Toast.success(successMessage);

			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useCreateRatesheet;
