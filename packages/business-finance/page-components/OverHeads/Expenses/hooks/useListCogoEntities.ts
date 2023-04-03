import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

interface Props {
	cogoEntityId?:string | number,
}

const useListCogoEntities = ({ cogoEntityId }:Props) => {
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
				await trigger({
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
