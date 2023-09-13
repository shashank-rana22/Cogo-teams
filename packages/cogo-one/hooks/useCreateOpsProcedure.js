import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateOpsProcedure = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_operating_procedure',
		method : 'POST',
	}, { manual: true });

	const createOpsProcedure = async ({ data }) => {
		try {
			const res = await trigger({
				data,
			});

			return res?.data?.id || '';
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data) || 'Something Went Wrong.Please try again');
			return '';
		}
	};

	return {
		createOpsProcedure,
		procedureLoading: loading,
	};
};
export default useCreateOpsProcedure;
