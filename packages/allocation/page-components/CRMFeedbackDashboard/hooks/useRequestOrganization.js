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
			organization_id      : type === 'lead_organization' ? (undefined) : (organizationId),
			lead_organization_id : type === 'lead_organization' ? (organizationId) : (undefined),
			// status               : ['requested', 'responded', 'inactive'],
		},
	});

	const [{ data, loading }] = useAllocationRequest({
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

	// const dummyData = [
	// 	{
	// 		id              : 'something1',
	// 		serial_id       : '1',
	// 		organization    : 'Some Organization 1',
	// 		organization_id : 'anmolbansal1',
	// 		created_at      : '2023-03-13T08:09:59.087Z',
	// 		response_date   : '2023-03-13T08:09:59.087Z',
	// 		status          : 'response_received',
	// 	},
	// 	{
	// 		id              : 'something2',
	// 		serial_id       : '2',
	// 		organization    : 'Some Organization 2',
	// 		organization_id : 'anmolbansal2',
	// 		created_at      : '2023-03-13T08:09:59.087Z',
	// 		response_date   : null,
	// 		status          : 'request_created',
	// 	},
	// 	{
	// 		id              : 'something3',
	// 		serial_id       : '3',
	// 		organization    : 'Some Organization 3',
	// 		organization_id : 'anmolbansal3',
	// 		created_at      : '2023-03-13T08:09:59.087Z',
	// 		response_date   : '2023-03-13T08:09:59.087Z',
	// 		status          : 'deactivated',
	// 	},
	// ];

	// const paginationData = {
	// 	page        : 1,
	// 	page_limit  : 10,
	// 	total       : 1,
	// 	total_count : 2,
	// };

	const { list = [], ...paginationData } = data || {};

	// const list = dummyData;

	return {
		data: list,
		loading,
		router,
		setParams,
		paginationData,
		onChangeParams,
	};
};

export default useRequestOrganization;
