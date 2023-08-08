import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateOrganizationDocument = ({
	refetch = () => {},
	successMessage = 'Document Added To Organization Wallet',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_document',
		method : 'POST',

	}, { manual: true });

	const apiTrigger = async ({ values }) => {
		try {
			await trigger({ data: values });
			refetch();
			Toast.success(successMessage);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useCreateOrganizationDocument;
