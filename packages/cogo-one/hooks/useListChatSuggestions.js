/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useListChatSuggestions() {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_chat_suggestions',
		method : 'get',
	}, { manual: true });

	const fetchListLogApi = async () => {
		try {
			await trigger({
				params: {

					filters: {
						suggestion_type: 'suggestion',
					},
				},
			});
		} catch (error) {
			// console.log(error);
		}
	};
	useEffect(() => {
		fetchListLogApi();
	}, []);

	const { list = [] } = data || {};
	const suggestions = loading ? [] : (list || []).slice(0, 4).map(({ content = '' }) => content);
	return {
		suggestions,
	};
}

export default useListChatSuggestions;
