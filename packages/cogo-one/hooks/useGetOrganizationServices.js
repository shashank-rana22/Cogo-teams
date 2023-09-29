import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getParams = ({ orgId = '' }) => ({
	organization_id: orgId,
});

const useGetOrganizationServices = ({ orgId = '', toggleState = false }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_organization_services',
		method : 'get',
	}, { manual: true });

	const getOrgService = useCallback(() => {
		if (!orgId) {
			return;
		}

		try {
			trigger({
				params: getParams({ orgId }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [orgId, trigger]);

	useEffect(() => {
		getOrgService();
	}, [getOrgService, toggleState]);

	return {
		loading,
		data,
	};
};

export default useGetOrganizationServices;
