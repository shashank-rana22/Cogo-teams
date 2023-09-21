import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useUpdateOrganizationService = () => {
	const router = useRouter();
	const [{ loading }, trigger] = useRequest({
		url    : 'update_organization_service',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = useCallback(async ({ data = {} }) => {
		try {
			await trigger({ data });
			Toast.success('service updated successfully');
			router.push('/service-management');
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger, router]);

	return { loading, apiTrigger };
};
export default useUpdateOrganizationService;
