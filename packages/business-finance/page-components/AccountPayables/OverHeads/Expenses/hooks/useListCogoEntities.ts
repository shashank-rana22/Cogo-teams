import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListCogoEntities = () => {
	const [{ data }, trigger] = useRequest(
		{
			url    : 'list_cogo_entities',
			method : 'get',
		},
		{ autoCancel: false },
	);

	useEffect(() => {
		const api = async () => {
			try {
				await trigger();
			} catch (err) {
				Toast.error('Something went wrong');
			}
		};
		api();
	}, [trigger]);

	return {
		entityList: data?.list,
	};
};

export default useListCogoEntities;
