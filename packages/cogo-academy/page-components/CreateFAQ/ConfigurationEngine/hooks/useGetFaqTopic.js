import { useRequest } from '@cogoport/request';

function useGetFaqTopic() {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_faq_topic',
	}, { manual: true });

	const fetchFaqTopic = async (id) => {
		try {
			await trigger({
				params: { id },
			});
		} catch (err) {
			// console.log(err);
		}
	};

	return { fetchFaqTopic, data, loading };
}

export default useGetFaqTopic;
