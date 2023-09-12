import { useForm } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const LOG_DATA = [
	{
		id                : 1,
		activity          : 'Sent to enrichment',
		assigned_accounts : '120 Accounts',
		agency            : 'agency 1',
		assign_date       : '2023-07-25',
		assigned_by       : 'HK',
	},
	{
		id                : 2,
		activity          : 'Sent to enrichment',
		assigned_accounts : '120 Accounts',
		agency            : 'agency 1',
		assign_date       : '2023-07-25',
		assigned_by       : 'HK',
	},
	{
		id                : 3,
		activity          : 'Sent to enrichment',
		assigned_accounts : '120 Accounts',
		agency            : 'agency 1',
		assign_date       : '2023-07-25',
		assigned_by       : 'HK',
	},
];

const useGetLogs = () => {
	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
	});

	const { control, handleSubmit, reset } = useForm();

	const [{ data, loading }] = useAllocationRequest({
		url     : '/feedbacks',
		method  : 'get',
		authkey : 'get_allocation_feedbacks',
		params,
	}, { manual: false });

	const { list1 = [], ...paginationData } = data || {};

	const handleClick = async (formValues) => {
		const {
			account_name,
			assigned_by,
			enrichment_agency,
		} = formValues;
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				account_name      : account_name || undefined,
				assigned_by       : assigned_by || undefined,
				enrichment_agency : enrichment_agency || undefined,
			},
		}));
	};

	return {
		loading,
		list1,
		response: (LOG_DATA || []),
		control,
		handleClick,
		handleSubmit,
		reset,
		setParams,
		params,
		paginationData,
	};
};

export default useGetLogs;
