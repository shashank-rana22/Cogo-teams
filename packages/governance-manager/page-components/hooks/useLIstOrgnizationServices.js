import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useListOrganizationServices({ currentPage }) {
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
						stage_of_approval          : 'need_analysis',
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);
	return {
		data       : data?.list,
		loading,
		totalCount : data?.total_count,
	};
}
export default useListOrganizationServices;
