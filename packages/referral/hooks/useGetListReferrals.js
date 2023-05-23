import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetListReferrals = ({ filter = '', activeTab = '' }) => {
	const api = activeTab === 'invited' ? 'list_referral_invites' : 'list_referral_mappings';

	const [{ data: listReferals, loading: listLoading }, trigger] = useRequest({
		url    : `/${api}`,
		method : 'get',
	}, { manual: true });

	const [listPagination, setListPagination] = useState(1);

	useEffect(() => {
		setListPagination(1);
	}, [activeTab]);

	const getListReferrals = useCallback(async () => {
		try {
			await trigger({
				params: {
					page    : listPagination,
					filters : {
						referee_type : activeTab !== 'invited' ? activeTab : undefined,
						status       : filter || undefined,

					},
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [trigger, listPagination, activeTab, filter]);

	useEffect(() => {
		getListReferrals();
	}, [getListReferrals]);

	return {
		listReferals,
		listLoading,
		setListPagination,
		getListReferrals,
	};
};

export default useGetListReferrals;
