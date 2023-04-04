import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useGetAudience() {
	const { general } = useSelector((state) => state);
	const { id } = general.query || {};

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_faq_audience',
	}, { manual: false });

	const fetchAudience = () => {
		try {
			trigger({
				params: { id },
			});
		} catch (err) {
			console.log(err);
		}
	};

	return { fetchAudience, data: data?.data, loading };
}

export default useGetAudience;
