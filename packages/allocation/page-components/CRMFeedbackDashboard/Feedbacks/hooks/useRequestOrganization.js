import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useRequestOrganization = ({ organization_id = '' }) => {
	const router = useRouter();

	const [checkedRow, setCheckedRow] = useState('');

	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
		filters    : {
			organization_id,
		},
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
			},
		});
	}, [params, trigger]);

	const dummyData = [
		{
			id              : 'something1',
			serial_id       : '1',
			organization    : 'Some Organization 1',
			organization_id : 'anmolbansal',
			created_at      : '2023-03-13T08:09:59.087Z',
			response_date   : '2023-03-13T08:09:59.087Z',
			status          : 'response_received',
		},
		{
			id            : 'something2',
			serial_id     : '2',
			organization  : 'Some Organization 2',
			created_at    : '2023-03-13T08:09:59.087Z',
			response_date : null,
			status        : 'request_created',
		},
		{
			id            : 'something3',
			serial_id     : '3',
			organization  : 'Some Organization 3',
			created_at    : '2023-03-13T08:09:59.087Z',
			response_date : '2023-03-13T08:09:59.087Z',
			status        : 'deactivated',
		},
	];

	const paginationData = {
		page        : 1,
		page_limit  : 10,
		total       : 1,
		total_count : 2,
	};

	// const { list = [], ...paginationData } = data || {};

	const list = dummyData;

	const onChangeBodyCheckbox = (event, id) => {
		setCheckedRow(id);
	};

	return {
		data: list,
		loading,
		router,
		setParams,
		paginationData,
		onChangeParams,
		checkedRow,
		onChangeBodyCheckbox,
	};
};

export default useRequestOrganization;
