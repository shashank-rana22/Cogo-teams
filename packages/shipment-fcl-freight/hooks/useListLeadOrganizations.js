import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useListLeadOrganizations({ params }) {
	const [{ loading, data: listLeads }, trigger] = useRequest({
		url    : '/list_lead_organizations',
		method : 'GET',
		params,
	}, { manual: false });

	const getListOrganizations = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getListOrganizations();
	}, [getListOrganizations]);

	return {
		listLeads,
		loading,
		getListOrganizations,
	};
}

export default useListLeadOrganizations;
