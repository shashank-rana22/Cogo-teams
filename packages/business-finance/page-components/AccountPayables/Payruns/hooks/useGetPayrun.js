import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const getPayrunListPayload = ({ activePayrunTab, overseasData, query, pageIndex, pageSize, activeEntity = '' }) => ({
	pageSize,
	state              : activePayrunTab,
	type               : overseasData || undefined,
	uploadDateSortType : 'desc',
	dueDateSortType    : 'asc',
	createdAtSortType  : 'desc',
	q                  : query !== '' ? query : undefined,
	pageIndex,
	entityCode         : activeEntity,
});

const useGetPayrun = ({ activePayrunTab, overseasData, query, globalFilters }) => {
	const { pageIndex, pageSize, activeEntity = '' } = globalFilters || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'get',
			authKey : 'get_purchase_payrun',
		},
		{ manual: true, autoCancel: false },
	);

	const getPayrunList = useCallback(() => {
		const payload = getPayrunListPayload({
			activePayrunTab,
			overseasData,
			query,
			pageIndex,
			pageSize,
			activeEntity,
		});

		try {
			trigger({
				params: payload,
			});
		} catch (err) {
			Toast.error(err.message);
		}
	}, [activePayrunTab, overseasData, pageIndex, pageSize, query, trigger, activeEntity]);

	const { stats } = data || {};

	return {
		payrunData    : data,
		payrunLoading : loading,
		payrunStats   : stats,
		getPayrunList,
	};
};

export default useGetPayrun;
