import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import getEntityCode from '@cogoport/globalization/utils/getEntityCode';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const BILL_TYPE = ['PURCHASE', 'PROFORMA', 'CONSOLIDATED'];

const formatDate = (date) => {
	if (!date) return undefined;

	return (format(date, "yyyy-MM-dd'T'HH:mm:sso", {}, false));
};
const useGetListStats = ({ filters = {}, searchValue = '' }) => {
	const profile = useSelector((state) => state);

	const entityCode = getEntityCode(profile?.profile?.partner?.id);

	const { debounceQuery, query } = useDebounceQuery();

	const showbillType = filters?.billType === 'PURCHASE' ? 'false' : undefined;
	const showProforma = filters?.billType === 'PROFORMA' ? true : undefined;
	const showConsolidated = filters?.billType === 'CONSOLIDATED' ? 'CONSOLIDATED' : undefined;

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url    : '/purchase/bills/list-stats',
			method : 'get',
			params : {
				currency        : filters?.currency,
				billDateFrom    : formatDate(filters?.billDate?.startDate),
				billDateTo      : formatDate(filters?.billDate?.endDate),
				dueDateFrom     : formatDate(filters?.dueDate?.startDate),
				dueDateTo       : formatDate(filters?.dueDate?.endDate),
				updatedDateFrom : formatDate(filters?.updatedDate?.startDate) || filters?.updatedDateFrom || undefined,
				updatedDateTo   : formatDate(filters?.updatedDate?.endDate) || filters?.updatedDateTo || undefined,
				urgencyTag      : filters?.urgencyTag || undefined,
				billType        : BILL_TYPE.includes(filters?.billType) ? 'BILL' : filters?.billType || undefined,
				jobType        	: showConsolidated,
				proforma        : showbillType || showProforma,
				q               : query,
				entityCode,
			},
			authKey: 'get_purchase_bills_list_stats',
		},
		{ manual: false },
	);

	const apiTrigger = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			console.error(err);
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	useEffect(() => {
		debounceQuery(searchValue);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return {
		data,
		loading,
	};
};

export default useGetListStats;
