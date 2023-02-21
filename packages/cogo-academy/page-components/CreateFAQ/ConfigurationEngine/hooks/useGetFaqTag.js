import { useRequest } from '@cogoport/request';

function useGetFaqTag() {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_faq_tag',
	}, { manual: true });

	const fetchFaqTag = async (id) => {
		try {
			await trigger({
				params: { id },
			});
		} catch (err) {
			// console.log(err);
		}
	};

	return { fetchFaqTag, data, loading };
}

export default useGetFaqTag;
