import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useListFaqTags({ status = 'active' }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_tags',
	}, { manual: false });

	const fetchListFaqTags = async () => {
		try {
			await trigger({
				params: {
					filters: {
						created_at_less_than: '2023-02-21',
					},

				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	const listTags = data?.list?.[0] || {};

	useEffect(() => {
		fetchListFaqTags();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);

	return {
		fetchListFaqTags,
		loading,
		listTags,
	};
}

export default useListFaqTags;
