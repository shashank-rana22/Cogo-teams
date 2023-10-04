import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getPayload from '../helpers/getFormattedValue';
import toastApiError from '../utils/toastApiError';

const useUpdateLocation = ({ refetch }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_location',
		method : 'post',
	}, { manual: true });

	const apiTrigger = async ({ values = {}, id }) => {
		try {
			const payload = getPayload({ values, id });
			const res = await trigger({ data: payload });
			refetch();
			if (res?.data) {
				Toast.success('Location Updated Successfully');
			}
		} catch (error) {
			toastApiError(error);
		}
	};

	return {

		loading,
		apiTrigger,
	};
};

export default useUpdateLocation;
