import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getApiErrorString from '../utils/getApiErrorString';

const useCreateOrganizationAddress = ({
	refetch,
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
			Toast.error(getApiErrorString(err));
		}
	};

	return {
		apiTrigger, loading,
	};
};

export default useCreateOrganizationAddress;
