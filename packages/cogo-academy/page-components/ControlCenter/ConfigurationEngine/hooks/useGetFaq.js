import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useGetFaq() {
	const { general } = useSelector((state) => state);
	const { update = '', id } = general.query || {};

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : update && id ? `/get_faq_${update}` : null,

	}, { manual: false });

	const fetchFaq = async () => {
		try {
			await trigger({
				params: { id },
			});
		} catch (err) {
			console.log(err);
		}
	};

	return { fetchFaq, data: data?.[`${update}_details`], loading };
}

export default useGetFaq;
