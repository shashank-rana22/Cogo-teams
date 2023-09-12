import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const CONSTANT_ONE = 1;
const useGetRfqSearches = ({ rfqId, relevantToUser } = {}) => {
	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const [list, setList] = useState({
		data       : [],
		total      : 0,
		total_page : 0,
	});
	const [page, setPage] = useState(CONSTANT_ONE);
	const [{ loading }, refetch] = useRequest({
		method : 'GET',
		url    : '/list_rfq_searches',
		params : {
			filters: {
				rfq_id                   : rfqId,
				is_under_negotiation     : true,
				relevant_supply_agent_id : relevantToUser ? user_profile?.user?.id : undefined,
			},
			page,
			service_data_required: true,
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
	}, [page,relevantToUser]);

	return {
		loading,
		list,
		setPage,
	};
};
export default useGetRfqSearches;
