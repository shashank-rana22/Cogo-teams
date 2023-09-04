import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useListOrganizationExpertiseSuppliers({ organization_id, service_type, page, service_id }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_location_expert_service_provider_stats',
	}, { manual: true });

	const getOrganizationExpertiseSuppliers = async () => {
		try {
			await trigger({
				params: {
					filters: {
						organization_id,
						service_type,
						status: 'active',
						service_id,
					},
					all_service_requirement_checked_data_required: true,
					page,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (organization_id) { getOrganizationExpertiseSuppliers(); }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organization_id, page]);
	return {
		data          : data?.list,
		loading,
		totalCount    : data?.total_count,
		isProceedable : data?.check_proceed,
		getOrganizationExpertiseSuppliers,
	};
}
export default useListOrganizationExpertiseSuppliers;
