import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetOrganizationServiceExpertises({ organization_id, service_id }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_organization_service_expertises',
	}, { manual: true });

	const getOrganizationServiceExpertises = async () => {
		try {
			await trigger({
				params: {
					filters: {
						organization_id,
						service_id,
					},
					pagination_data_required  : true,
					location_details_required : true,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (organization_id && service_id) { getOrganizationServiceExpertises(); }
	}, [organization_id]);
	return {
		data       : data?.list,
		loading,
		totalCount : data?.total_count,
	};
}
export default useGetOrganizationServiceExpertises;
