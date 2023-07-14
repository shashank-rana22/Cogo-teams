import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListCogoEntities = ({ cogoEntityId }) => {
	const [{ data }, trigger] = useRequest(
		{
			url    : 'list_cogo_entities',
			method : 'get',
		},
		{ manual: true },
	);

	useEffect(() => {
		const api = async () => {
			try {
				trigger({
					params: {
						filters: { id: cogoEntityId || undefined },
					},
				});
			} catch (err) {
				console.log('error-', err);
			}
		};
		api();
	}, [trigger, cogoEntityId]);

	return {
		entityList: data?.list,
	};
};

export default useListCogoEntities;
