import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const FIRST_PAGE = 1;

const useListFclFreightRateExtensions = (searchQuery) => {
	const [page, setPage] = useState(FIRST_PAGE);
	// const { data, trigger, loading } = useRequest(
	// 	'get',
	// 	false,
	// 	'partner',
	// )('/list_fcl_freight_rate_extension_rule_sets');

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_fcl_freight_rate_extension_rule_sets',
		method : 'GET',
		scope  : 'partner',
	}, { manual: false });

	const listFclFreight = async () => {
		try {
			await trigger({
				params: {
					filters: {
						status : 'active',
						q      : searchQuery || undefined,
					},
					page,
				},
			});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		listFclFreight();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, searchQuery]);

	return {
		listFclFreight,
		data,
		loading,
		page,
		setPage,
	};
};

export default useListFclFreightRateExtensions;
