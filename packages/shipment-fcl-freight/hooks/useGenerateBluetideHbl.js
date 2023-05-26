import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useGenerateBluetideHbl = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/generate_bluetide_hbl',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ data: val });

			if (!res.hasError) {
				Toast.success('Document Created Successfully!!');

				refetch();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		docLoading: loading,
	};
};
export default useGenerateBluetideHbl;
