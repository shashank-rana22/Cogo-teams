import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useListOrganizationServices({ currentPage, activeTab, setApprovalStats, currentService }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_organization_services',
	}, { manual: true });

	const listOrganizationServices = async () => {
		try {
			await trigger({
				params: {
					filters: {
						stage_of_approval : activeTab,
						service           : currentService === 'all'
							? ['fcl_cfs',
								'fcl_customs',
								'lcl_customs',
								'air_customs',
								'haulage_freight',
								'lcl_freight'] : currentService,
						status: 'pending_approval',
					},
					service_expertise_required : true,
					page                       : currentPage,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		setApprovalStats(data?.approvals_stats);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);
	useEffect(() => {
		listOrganizationServices();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, activeTab, currentService]);
	return {
		data       : data?.list,
		loading,
		totalCount : data?.total_count,
	};
}
export default useListOrganizationServices;
