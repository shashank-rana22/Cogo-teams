import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetPayrun = ({ activePayrunTab, overseasData, query, globalFilters }) => {
	const { pageIndex } = globalFilters || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'get',
			authKey : 'get_purchase_payrun',
		},
		{ manual: true, autoCancel: false },
	);

	const getPayrunListPayload = useCallback(() => ({
		pageSize           : 10,
		state              : activePayrunTab,
		type               : activePayrunTab !== 'INITIATED' ? overseasData : undefined,
		uploadDateSortType : 'desc',
		dueDateSortType    : 'asc',
		createdAtSortType  : 'desc',
		q                  : query !== '' ? query : undefined,
		pageIndex,
	}), [activePayrunTab, overseasData, pageIndex, query]);

	const getPayrunList = useCallback(() => {
		const getPayload = getPayrunListPayload();
		try {
			trigger({
				params: getPayload,
			});
		} catch (err) {
			Toast.error(err.message);
		}
	}, [getPayrunListPayload, trigger]);

	const { stats } = data || {};

	return {
		payrunData    : data,
		payrunLoading : loading,
		payrunStats   : stats,
		getPayrunList,
	};
};

export default useGetPayrun;
