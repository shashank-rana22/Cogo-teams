import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useRequestTableData = () => {
	const router = useRouter();

	const [filters, setFilters] = useState({});

	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
		filters    : {},
	});

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/feedbacks',
		method  : 'get',
		authkey : 'get_allocation_feedbacks',
		params,
	}, { manual: true });

	const onChangeParams = (values = {}) => {
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	};

	useEffect(() => {
		trigger({
			params: {
				...params,
				filters: { ...params?.filters, ...filters },
			},
		});
	}, [params, filters, trigger]);

	const onChangeFilters = (values) => {
		setFilters((previousState) => ({
			...filters,
			...previousState,
			...values,
		}));
	};

	const dummyData = [
		{
			id                 : 'something',
			serial_id          : '1',
			organization       : 'Some Org',
			organization_id    : 'hfhfhduiasuhuishnui',
			count_of_feedbacks : 23,
			last_feedback_date : '2023-03-13T08:09:59.087Z',
			cogo_entity        : 'Singapore',
			status             : 'Request Created',
		},
		{
			id                 : 'something1',
			serial_id          : '2',
			organization       : 'Some Organzation Name',
			organization_id    : 'hdkghfklre',
			count_of_feedbacks : 12,
			last_feedback_date : '2021-04-13T08:09:59.087Z',
			cogo_entity        : 'India',
			status             : '4/10 Response Received',
		},
	];

	const paginationData = {
		page        : 1,
		page_limit  : 10,
		total       : 1,
		total_count : 8,
	};

	// const { list = [], ...paginationData } = data || {};

	const list = dummyData;

	return {
		router,
		data: list,
		loading,
		setParams,
		paginationData,
		filters,
		onChangeFilters,
		onChangeParams,
	};
};

export default useRequestTableData;
