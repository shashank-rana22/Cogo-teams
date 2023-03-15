import { useRequest } from '@cogoport/request';

const useListCogooneTimeline = ({ id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogoone_timeline',
		method : 'get',
	}, { manual: true });

	const getCogooneTimeline = async ({ endDate, startDate }) => {
		try {
			await trigger({
				params: {
					page_limit               : 100,
					channel_chat_id          : id,
					created_at_less_than     : new Date(Number(endDate)),
					created_at_greater_than  : new Date(Number(startDate)),
					pagination_data_required : false,
				},
			});
		} catch (error) {
			// console.log(error);
		}
	};

	return {
		data,
		getCogooneTimeline,
		loading,
	};
};

export default useListCogooneTimeline;
