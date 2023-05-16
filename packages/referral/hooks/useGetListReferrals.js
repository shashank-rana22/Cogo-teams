import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetListReferrals = ({ filter = '', searchValue = '', activeTab = '' }) => {
	const { query = '', debounceQuery } = useDebounceQuery();

	const api = activeTab === 'invited' ? 'list_referral_invites' : 'list_referral_mappings';

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
						referee_type : activeTab !== 'invited' ? activeTab : undefined,
						status       : filter || undefined,
						q            : query || undefined,

					},
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [trigger, listPagination, activeTab, filter, query]);

	useEffect(() => {
		getListReferrals();
	}, [getListReferrals]);

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
