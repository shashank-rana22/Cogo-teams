import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';
// import { toast } from '@cogoport/front/components';

const useHistorySingleDataList = (documentNo, accountType) => {
	const [globalFilters, setGlobalFilters] = useState({
		page      : 1,
		pageLimit : 5,
	});
	const [dataList, setDataList] = useState({});

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/settlement',
			authKey : 'get_payments_settlement',
			method  : 'get',
		},
		{ manual: true },
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
			// setData(res.data);
		} catch (error) {
			// setData({});
			// toast.error('Someting went wrong, we are working on it!');
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
		// setData,
	};
};

export default useHistorySingleDataList;
