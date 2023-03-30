import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

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
				console.log(err);
			}
		})();
	}, [triggerGetEntityStakeholder]);

	useEffect(() => {
		getEntityStakeholder();
	}, [getEntityStakeholder]);

	const options = (getEntityStakeholderApi.data || []).map((item) => ({
		label : item.description,
		value : item.description,
	}));

	options.push({ label: 'Other', value: 'Other' });

	return {
		getEntityStakeholderApi,
		getEntityStakeholder,
		options,
	};
};

export default useGetEntityStakeholderMappings;
