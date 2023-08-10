import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useGenerateBluetideHbl = ({
	refetch = () => {},
	successMessage = 'Successfully Generated',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/generate_bluetide_hbl',
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
		apiTrigger,
		docLoading: loading,
	};
};
export default useGenerateBluetideHbl;
