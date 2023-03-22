import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListCogoEntity = () => {
	const [{ data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_cogo_entities',
	});

	useEffect(() => {
		try {
			trigger({
				params: {
					filters: {
						status: 'active',
					},
					page_limit : 100,
					page       : 1,
				},
			});
		} catch (e) {
			console.log(e, 'e');
		}
	}, []);

	const list = (data?.list || [])
		.map((item) => ({
			...item,
			value : item?.id,
			label : `${item.entity_code} ${item.business_name}`,
		}));

	return {
		list,
	};
};

export default useListCogoEntity;
