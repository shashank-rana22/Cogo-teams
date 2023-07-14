import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useState } from 'react';

const useHistorySingleDataList = () => {
	const [globalFilters, setGlobalFilters] = useState({
		page      : 1,
		pageLimit : 5,
	});

	const [
		{ data: singleData, loading: singleListLoading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/settlement',
			method  : 'get',
			authKey : 'get_payments_settlement',
		},
		{ manual: true },
	);

	const getHistoryChild = async (value) => {
		try {
			const { documentNo = undefined, accountType = undefined } = value || {};
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

	return {
		singleData,
		globalFilters,
		setGlobalFilters,
		getHistoryChild,
		singleListLoading,
	};
};

export default useHistorySingleDataList;
