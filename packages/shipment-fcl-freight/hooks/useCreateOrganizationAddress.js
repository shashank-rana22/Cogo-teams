import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreateOrganizationAddress = ({
	refetch = () => {},
	successMessage = 'Successfully Created',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_address',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (payload) => {
		try {
			await trigger({ data: payload });

			Toast.success(successMessage);

			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useCreateOrganizationAddress;
