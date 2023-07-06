import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetOrganizationService({ id }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_organization_services',
	}, { manual: true });

	const getOrganizationService = async () => {
		try {
			await trigger({
				params: {
					filters: {
						service_expertise_required: true,
						id,
					},
					page: 1,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (id) { getOrganizationService(); }
	}, []);
	return {
		data       : data?.list[0],
		loading,
		totalCount : data?.total_count,
	};
}
export default useGetOrganizationService;
