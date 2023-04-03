import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useRequestOrganization = ({ organizationId = '', type = '' }) => {
	const router = useRouter();

	const [params, setParams] = useState({
		page_limit     : 10,
		page           : 1,
		is_third_party : false,
		filters        : {
			organization_id      : type === 'lead_organization' ? undefined : organizationId,
			lead_organization_id : type === 'lead_organization' ? organizationId : undefined,
		},
	});

	const [{ data = [], loading = false }, refetch] = useAllocationRequest({
		url     : '/feedback_requests',
		method  : 'get',
		authkey : 'get_allocation_feedbacks',
		params,
	}, { manual: false });

	const onChangeParams = (values = {}) => {
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	return {
		data: list,
		loading,
		router,
		setParams,
		paginationData,
		onChangeParams,
		refetch,
	};
};

export default useRequestOrganization;
