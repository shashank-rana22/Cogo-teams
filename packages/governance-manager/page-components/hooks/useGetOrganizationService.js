/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetOrganizationService = ({ id, setStatus }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_organization_services',
	}, { manual: true });

	const getOrganizationService = async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						service_expertise_required: true,
						id,
					},
					page: 1,
				},
			});
			let approval_stage = res?.data?.list[GLOBAL_CONSTANTS.zeroth_index]?.approval_stage;
			if (approval_stage === 'contract_and_sla_approval') { approval_stage = 'contract_and_sla_updation'; }
			setStatus(approval_stage);
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	useEffect(() => {
		if (id) { getOrganizationService(); }
	}, []);

	return {
		data       : data?.list[GLOBAL_CONSTANTS.zeroth_index],
		loading,
		totalCount : data?.total_count,
		getOrganizationService,
	};
};
export default useGetOrganizationService;
