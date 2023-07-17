import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useListOrganizationExpertiseSuppliers({ organization_id, service_type }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_organization_service_expertise_suppliers',
	}, { manual: true });

	const getOrganizationExpertiseSuppliers = async () => {
		try {
			await trigger({
				params: {
					filters: {
						organization_id,
						service_type,
						status: 'active',
					},
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (organization_id) { getOrganizationExpertiseSuppliers(); }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organization_id]);
	return {
		data       : data?.list,
		loading,
		totalCount : data?.total_count,
	};
}
export default useListOrganizationExpertiseSuppliers;
