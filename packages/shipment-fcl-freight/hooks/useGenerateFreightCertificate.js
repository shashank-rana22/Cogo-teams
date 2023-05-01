import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useGenerateFreightCertificate = ({
	refetch = () => {},
	successMessage = 'Successfully Generated Freight Certificate',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'generate_freight_certificate',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			await trigger({ data: { ...val } });

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

export default useGenerateFreightCertificate;
