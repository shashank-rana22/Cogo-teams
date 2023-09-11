import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useListLeadOrganizations({ task = {} }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_lead_organizations',
		method : 'GET',
		params : {
			filters: {
				source_id: task?.task_field_id,
			},
			lead_user_data_required: true,
		},
	}, { manual: false });

	const getListLeadOrganizations = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getListLeadOrganizations();
	}, [getListLeadOrganizations]);

	return {
		listLeads: data?.list,
		loading,
		getListLeadOrganizations,
	};
}

export default useListLeadOrganizations;
