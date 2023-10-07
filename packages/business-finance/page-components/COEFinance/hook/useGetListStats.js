import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import getEntityCode from '@cogoport/globalization/utils/getEntityCode';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const BILL_TYPE = ['PURCHASE', 'PROFORMA', 'CONSOLIDATED'];

const formatDate = (date) => (
	format(date, "yyyy-MM-dd'T'HH:mm:sso", {}, false)
);
const useGetListStats = ({ filters = {}, searchValue = '' }) => {
	const profile = useSelector((state) => state);

	const entityCode = getEntityCode(profile?.profile?.partner?.id);

	const { debounceQuery, query } = useDebounceQuery();

	const showbillType = filters?.billType === 'PURCHASE' ? 'false' : undefined;
	const showProforma = filters?.billType === 'PROFORMA' ? true : undefined;
	const showConsolidated = filters?.billType === 'CONSOLIDATED' ? 'CONSOLIDATED' : undefined;

	const billDatesStartFilters = 	(filters?.billDate?.startDate === undefined
		|| filters?.billDate?.startDate === null)
		? null : formatDate(filters?.billDate?.startDate);

	const billDatesEndFilters = 	(filters?.billDate?.endDate === undefined
		|| filters?.billDate?.endDate === null)
		? null : formatDate(filters?.billDate?.endDate);

	const dueDatesStartFilters = 	(filters?.dueDate?.startDate === undefined
		|| filters?.dueDate?.startDate === null)
		? null : formatDate(filters?.dueDate?.startDate);

	const dueDatesEndFilters = 	(filters?.dueDate?.endDate === undefined
		|| filters?.dueDate?.endDate === null)
		? null : formatDate(filters?.dueDate?.endDate);

	const updatedDateStartFilters = 	(filters?.updatedDate?.startDate === undefined
		|| filters?.updatedDate?.startDate === null)
		? null : formatDate(filters?.updatedDate?.startDate);

	const updatedDateEndFilters = 	(filters?.updatedDate?.endDate === undefined
		|| filters?.updatedDate?.endDate === null)
		? null : formatDate(filters?.updatedDate?.endDate);

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url    : '/purchase/bills/list-stats',
			method : 'get',
			params : {
				currency        : filters?.currency,
				billDateFrom    : billDatesStartFilters || undefined,
				billDateTo      : billDatesEndFilters || undefined,
				dueDateFrom     : dueDatesStartFilters || undefined,
				dueDateTo       : dueDatesEndFilters || undefined,
				updatedDateFrom : updatedDateStartFilters || filters?.updatedDateFrom || undefined,
				updatedDateTo   : updatedDateEndFilters || filters?.updatedDateTo || undefined,
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
			console.log(err);
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
