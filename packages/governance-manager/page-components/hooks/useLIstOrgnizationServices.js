import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useListOrganizationServices({ currentPage, activeTab }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_organization_services',
	}, { manual: true });

	const listOrganizationServices = async () => {
		try {
			await trigger({
				params: {
					filters: {
						service_expertise_required : true,
						stage_of_approval          : activeTab,
					},
					page: currentPage,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		listOrganizationServices();
	}, [currentPage, activeTab]);
	return {
		data       : data?.list,
		loading,
		totalCount : data?.total_count,
	};
}
export default useListOrganizationServices;
