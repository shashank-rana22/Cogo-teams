import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetListReferrals = ({ filter = '', searchValue = '', activeTab = '', date }) => {
	const { query = '', debounceQuery } = useDebounceQuery();

	const api = activeTab === 'invited' ? 'list_referral_invites' : 'list_referral_invites_testing';

	const [{ data: listReferals, loading: listLoading }, trigger] = useRequest({
		url    : `/${api}`,
		method : 'get',
	}, { manual: true });

	const [listPagination, setListPagination] = useState(1);

	const getListReferrals = useCallback(async () => {
		try {
			await trigger({
				params: {
					page    : listPagination,
					filters : {
						status : filter || undefined,
						name   : query || undefined,
						date,
					},
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [trigger, listPagination, filter, query, date]);

	useEffect(() => {
		getListReferrals();
	}, [getListReferrals, activeTab]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	return {
		listReferals,
		listLoading,
		setListPagination,
		getListReferrals,
	};
};

export default useGetListReferrals;
