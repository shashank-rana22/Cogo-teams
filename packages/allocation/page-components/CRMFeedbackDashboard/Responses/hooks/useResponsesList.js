import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useResponsesList = ({ activeTab = '', feedback_request_id = '' }) => {
	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
		filters    : {
			feedback_request_id,
			response_type: activeTab,
		},
	});

	const [{ loading = false, data = [] }] = useAllocationRequest({
		url     : '/feedback_responses',
		method  : 'get',
		authkey : 'get_allocation_feedback_responses',
		params,
	}, { manual: false });

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	return {
		loading,
		data: list,
		paginationData,
		getNextPage,
	};
};

export default useResponsesList;
