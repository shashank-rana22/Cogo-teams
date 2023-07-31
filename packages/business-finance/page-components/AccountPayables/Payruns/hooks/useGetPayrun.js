import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const getPayrunListPayload = ({ activePayrunTab, overseasData, query, pageIndex, pageSize }) => ({
	pageSize,
	state              : activePayrunTab,
	type               : activePayrunTab !== 'INITIATED' ? overseasData : undefined,
	uploadDateSortType : 'desc',
	dueDateSortType    : 'asc',
	createdAtSortType  : 'desc',
	q                  : query !== '' ? query : undefined,
	pageIndex,
});

const useGetPayrun = ({ activePayrunTab, overseasData, query, globalFilters }) => {
	const { pageIndex, pageSize } = globalFilters || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'get',
			authKey : 'get_purchase_payrun',
		},
		{ manual: true, autoCancel: false },
	);

	const getPayrunList = useCallback(() => {
		const payload = getPayrunListPayload({ activePayrunTab, overseasData, query, pageIndex, pageSize });

		try {
			trigger({
				params: payload,
			});
		} catch (err) {
			Toast.error(err.message);
		}
	}, [activePayrunTab, overseasData, pageIndex, pageSize, query, trigger]);

	const { stats } = data || {};

	return {
		payrunData    : data,
		payrunLoading : loading,
		payrunStats   : stats,
		getPayrunList,
	};
};

export default useGetPayrun;
