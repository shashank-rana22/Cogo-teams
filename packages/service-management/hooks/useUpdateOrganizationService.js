import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useUpdateOrganizationService = ({ refetch = () => {} }) => {
	const router = useRouter();
	const [{ loading }, trigger] = useRequest({
		url    : 'update_organization_service',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = useCallback(async ({ data = {}, reload = false }) => {
		try {
			await trigger({ data });
			Toast.success('service updated successfully');
			if (reload) router.push('/service-management');
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger, router, refetch]);

	return { loading, apiTrigger };
};
export default useUpdateOrganizationService;
