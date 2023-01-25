import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import { GenericObject, NestedObj } from '../../commons/Interfaces/index';

interface Props {
	filters: GenericObject;
	setFilters: (p: object) => void;
	sort: NestedObj;
}

const useGetPurchaseViewList = ({ filters, setFilters, sort }: Props) => {
	const [currentTab, setCurrentTab] = useState('INITIATED');
	const { debounceQuery, query } = useDebounceQuery();
	const [searchValue, setSearchValue] = useState('');

	const showFilter = () => {
		if (filters?.billType === 'PURCHASE') {
			return 'BILL';
		} if (filters?.billType === 'PROFORMA') {
			return 'BILL';
		} if (filters?.billType === 'CREDIT_NOTE') {
			return 'CREDIT_NOTE';
		} if (filters?.billType === 'REIMBURSEMENT') {
			return 'REIMBURSEMENT';
		}
		return undefined;
	};

	const showbillType = filters?.billType === 'PURCHASE' ? 'false' : undefined;
	const showProforma = filters?.billType === 'PROFORMA' ? true : undefined;

	const billDatesStartFilters = (filters?.billDate?.startDate === undefined || filters?.billDate?.startDate === null) ? null : format(filters?.billDate?.startDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const billDatesEndFilters = (filters?.billDate?.endDate === undefined || filters?.billDate?.endDate === null) ? null : format(filters?.billDate?.endDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const dueDatesStartFilters = (filters?.dueDate?.startDate === undefined || filters?.dueDate?.startDate === null) ? null : format(filters?.dueDate?.startDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const dueDatesEndFilters = (filters?.dueDate?.endDate === undefined || filters?.dueDate?.endDate === null) ? null : format(filters?.dueDate?.endDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const updatedDateStartFilters = (filters?.updatedDate?.startDate === undefined || filters?.updatedDate?.startDate === null) ? null : format(filters?.updatedDate?.startDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const updatedDateEndFilters = (filters?.updatedDate?.endDate === undefined || filters?.updatedDate?.endDate === null) ? null : format(filters?.updatedDate?.endDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const [{ data, loading }, refetch] = useRequestBf(
		{
			url    : '/purchase/bills/list',
			method : 'get',
			params : {
				...filters,
				billDate     : undefined,
				dueDate      : undefined,
				updatedDate  : undefined,
				billDateFrom : billDatesStartFilters === null && billDatesEndFilters === null ? undefined : billDatesStartFilters || null,
				billDateTo   : billDatesStartFilters && billDatesEndFilters === null ? billDatesStartFilters : billDatesStartFilters === null && billDatesEndFilters === null ? undefined : billDatesEndFilters || null,

				dueDateFrom : dueDatesStartFilters === null && dueDatesEndFilters === null ? undefined : dueDatesStartFilters || null,
				dueDateTo   : dueDatesStartFilters && dueDatesEndFilters === null ? dueDatesStartFilters : dueDatesStartFilters === null && dueDatesEndFilters === null ? undefined : dueDatesEndFilters || null,

				updatedDateFrom : updatedDateStartFilters === null && updatedDateEndFilters === null ? undefined : updatedDateStartFilters || null,
				updatedDateTo   : updatedDateStartFilters && updatedDateEndFilters === null ? updatedDateStartFilters : updatedDateStartFilters === null && updatedDateEndFilters === null ? undefined : updatedDateEndFilters || null,

				urgencyTag : filters?.urgencyTag || undefined,
				billType   : showFilter(),
				proforma   : showbillType || showProforma,
				status:
                    currentTab !== 'all' && currentTab !== 'Urgency_tag'
                    	? currentTab
                    	: undefined,
				isUrgent : currentTab === 'Urgency_tag' ? true : undefined,
				...sort,
				pageSize : 10,
			},
			authKey: 'get_purchase_bills_list',
		},
		{ manual: false },
	);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [searchValue]);

	useEffect(() => {
		setFilters((prev: GenericObject) => ({
			...prev,
			q         : query || undefined,
			pageIndex : 1,
			pageSize  : 10,
		}));
	}, [query]);

	useEffect(() => {
		refetch();
	}, [sort]);

	return {
		data,
		loading,
		currentTab,
		setCurrentTab,
		setSearchValue,
		searchValue,
	};
};

export default useGetPurchaseViewList;
