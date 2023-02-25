import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

const useListAssignedChatTags = () => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_assigned_chat_tags',
			method : 'get',
		},
		{ manual: true },
	);

	const fetchList = async () => {
		try {
			await trigger();
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		fetchList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
