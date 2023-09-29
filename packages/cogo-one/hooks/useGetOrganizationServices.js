import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const SERVICE_STATUS = ['active', 'inactive'];

const getParams = ({ orgId = '' }) => ({
	organization_id: orgId,
});

const useGetOrganizationServices = ({ orgId = '' }) => {
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
	}, [getOrgService]);

	const list = Object?.entries(data || {})
		?.map(([key, val]) => ({
			...val,
			key,
		}))
		.filter((val) => (val?.key !== 'trailer_freight' && SERVICE_STATUS.includes(val?.status)));

	return {
		orgLoading: loading,
		list,
	};
};

export default useGetOrganizationServices;
