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
			const res = 	await trigger({ data: { ...val } });

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

export default useGenerateFreightCertificate;
