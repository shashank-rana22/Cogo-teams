import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const ALL_SERVICES = [
	'fcl_freight',
	'fcl_cfs',
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'haulage_freight',
	'lcl_freight'];

function useListOrganizationServices({ currentPage, activeTab, setApprovalStats, currentService, role }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_organization_services',
	}, { manual: true });

	const listOrganizationServices = async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						approval_stage:
						{
							governance_manager:
							(activeTab === 'contract_and_sla_updation' ? 'contract_and_sla_updation' : activeTab),
							governance_lead:
							(activeTab === 'contract_and_sla_updation' ? 'contract_and_sla_approval' : activeTab),
						}[role],
						service : currentService === 'all' ? ALL_SERVICES : currentService,
						status  : 'pending_approval',
					},
					service_expertise_required : true,
					page                       : currentPage,
				},
			});
			setApprovalStats(res?.data?.approvals_stats);
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

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
