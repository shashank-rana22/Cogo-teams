import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useListAssignedChatTags = () => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_assigned_chat_tags',
			method : 'get',
		},
		{ manual: true },
	);

	const fetchList = useCallback(async () => {
		try {
			await trigger();
		} catch (error) {
			// console.log(error);
		}
	}, [trigger]);

	useEffect(() => {
		fetchList();
	}, [fetchList]);

	const { list = [] } = data || {};

	const tagOptions = !loading ? (list || []).map((item) => ({
		label : startCase(item || ''),
		value : item,
	})) : [];

	return {
		tagOptions,
	};
};
export default useListAssignedChatTags;
