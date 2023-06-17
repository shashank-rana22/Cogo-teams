import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useHistorySingleDataList = (documentNo, accountType) => {
	const [globalFilters, setGlobalFilters] = useState({
		page      : 1,
		pageLimit : 5,
	});

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/settlement',
			authKey : 'get_payments_settlement',
			method  : 'get',
		},
		{ manual: true, autoCancel: false },
	);
	const getHistoryChild = async () => {
		try {
			await trigger({
				params: {
					documentNo,
					settlementType: accountType,
					...globalFilters,
				},
			});
		} catch (error) {
			Toast.error('Someting went wrong, we are working on it!');
		}
	};

	useEffect(() => {
		getHistoryChild();
	}, [documentNo]);

	return {
		data,
		globalFilters,
		setGlobalFilters,
		getHistoryChild,
		loading,
	};
};

export default useHistorySingleDataList;
