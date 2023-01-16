import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetRfqSearches = ({ rfqId } = {}) => {
	const [list, setList] = useState({
		data       : [],
		total      : 0,
		total_page : 0,
	});
	const [page, setPage] = useState(1);

	const [{ loading }, refetch] = useRequest({
		method : 'GET',
		url    : '/list_rfq_searches',
		params : {
			filters               : { rfq_id: rfqId, is_under_negotiation: true },
			page,
			service_data_required : true,
		},
	}, { manual: false });

	useEffect(() => {
		refetch()
			.then((res) => {
				const { data = { list: [], total: 0 } } = res;
				setList(() => ({
					data       : data?.list || [],
					total      : data?.total_count,
					total_page : data?.total,
					page       : data?.page,
				}));
			})
			.catch(() => {
				setList(() => (
					{
						data       : [],
						total      : 0,
						total_page : 0,
						page       : 1,
					}));
			});
		// eslint-disable-next-line
	}, [page]);

	return {
		loading,
		list,
		setPage,
	};
};
export default useGetRfqSearches;
