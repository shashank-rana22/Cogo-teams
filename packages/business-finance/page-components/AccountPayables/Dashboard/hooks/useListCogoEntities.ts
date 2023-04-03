import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useListCogoEntities = () => {
	const [{ data }, trigger] = useRequest(
		{
			url    : 'list_cogo_entities',
			method : 'get',
		},
		{ manual: true },
	);

	const api = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				console.log(err, 'error');
			}
		})();
	}, [trigger]);

	return {
		entityList: data?.list,
		data,
		api,
	};
};

export default useListCogoEntities;
