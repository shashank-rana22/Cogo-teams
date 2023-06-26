import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useState } from 'react';

const useHistorySingleDataList = () => {
	const [globalFilters, setGlobalFilters] = useState({
		page      : 1,
		pageLimit : 5,
	});

	const onPageChange = (val:number) => {
		setGlobalFilters({ ...globalFilters, page: val });
	};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/settlement',
			authKey : 'get_payments_settlement',
			method  : 'get',
		},
		{ manual: true },
	);
	const getHistoryChild = async (values) => {
		const { documentNo, accountType } = values || {};
		try {
			await trigger({
				params: {
					documentNo     : documentNo || undefined,
					settlementType : accountType || undefined,
					page           : globalFilters.page,
					pageLimit      : globalFilters.pageLimit,
				},
			});
		} catch (error) {
			Toast.error('Someting went wrong, we are working on it!');
		}
	};

	return {
		data,
		globalFilters,
		setGlobalFilters,
		getHistoryChild,
		loading,
		onPageChange,
	};
};

export default useHistorySingleDataList;
