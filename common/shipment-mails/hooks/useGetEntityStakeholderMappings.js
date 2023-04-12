import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

/**
 * Single utility hook to get entity stakeholder mappings
*/

const useGetEntityStakeholderMappings = () => {
	const [getEntityStakeholderApi, triggerGetEntityStakeholder] = useLensRequest({
		url    : 'entity_stakeholder_mappings',
		method : 'GET',
	}, { manual: true });

	const getEntityStakeholder = useCallback(() => {
		(async () => {
			try {
				await triggerGetEntityStakeholder();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [triggerGetEntityStakeholder]);

	useEffect(() => {
		getEntityStakeholder();
	}, [getEntityStakeholder]);

	return {
		getEntityStakeholderApi,
	};
};

export default useGetEntityStakeholderMappings;
