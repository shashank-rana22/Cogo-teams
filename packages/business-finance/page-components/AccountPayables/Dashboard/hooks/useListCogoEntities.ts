import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

const useListCogoEntities = () => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_cogo_entities',
	}, { manual: false });
	const profile = useSelector((state) => state);
	const { profile:{ partner } } = profile || {};
	const { id, country } = partner || {};
	const { country_code:countryCode } = country || {};

	const getCogoList = useCallback(() => {
		(() => {
			try {
				trigger({
					params: {
						filters: {
							status : 'active',
							id     : countryCode === 'IN' ? undefined : id,
						},
						page_limit : 100,
						page       : 1,
					},
				});
			} catch (e) {
				console.log(e, 'e');
			}
		})();
	}, [countryCode, id, trigger]);

	useEffect(() => {
		getCogoList();
	}, [trigger, id, countryCode, getCogoList]);

	return {
		loading,
		entityData: data?.list || [],
	};
};

export default useListCogoEntities;
