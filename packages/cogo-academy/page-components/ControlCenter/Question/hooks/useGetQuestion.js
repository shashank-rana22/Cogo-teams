import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

function useGetQuestion() {
	const { general } = useSelector((state) => state);
	const { query = {} } = general;
	const { id = '' } = query || {};
	const { mode = '' } = query || {};

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_question',
	}, { manual: true });
	const fetchQuestion = useCallback(
		async () => {
			if (!id) return;

			try {
				await trigger({
					params: { id, is_admin_view: true },
				});
			} catch (err) {
				console.log(err);
			}
		},
		[id, trigger],
	);

	return { fetchQuestion, query, data, loading, mode };
}
export default useGetQuestion;
