import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreateOrganizationDocument = ({
	refetch = () => {},
	successMessage = 'Document Added To Organization Wallet',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_organization_document',
		method : 'POST',

	}, { manual: true });

	const apiTrigger = async ({ values }) => {
		try {
			const res = await trigger({ data: values });

			if (!res.hasError) {
				refetch();

				Toast.success(successMessage);
			}
		} catch (err) {
			toastApiError(err?.data);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useCreateOrganizationDocument;
