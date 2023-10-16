/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import getEntityCode from '@cogoport/globalization/utils/getEntityCode';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const useGetPurchaseViewList = ({ filters, setFilters, sort, subActiveTabReject, previouslySearched = '' }) => {
	const profile = useSelector((state) => state);

	const entityCode = getEntityCode(profile?.profile?.partner?.id);

	const getStatus = () => {
		if (subActiveTabReject === 'finance_rejected') {
			return 'FINANCE_REJECTED';
		}
		if (subActiveTabReject === 'coe_rejected') {
			return 'COE_REJECTED';
		}
		if (subActiveTabReject === 'coe_on_hold') {
			return 'ON_HOLD';
		}
		return 'ALL';
	};

	const [currentTab, setCurrentTab] = useState(getStatus());
	const [tab, setTab] = useState('ALL');
	const { debounceQuery, query } = useDebounceQuery();
	const [searchValue, setSearchValue] = useState(previouslySearched || '');

	const showFilter = () => {
		if (filters?.billType === 'PURCHASE') {
			return 'BILL';
		} if (filters?.billType === 'PROFORMA') {
			return 'BILL';
		} if (filters?.billType === 'CREDIT_NOTE') {
			return 'CREDIT_NOTE';
		} if (filters?.billType === 'CONSOLIDATED') {
			return 'BILL';
		} if (filters?.billType === 'REIMBURSEMENT') {
			return 'REIMBURSEMENT';
		} if (filters?.billType === 'EXPENSE') {
			return 'EXPENSE';
		}

		return undefined;
	};

	const showbillType = filters?.billType === 'PURCHASE' ? 'false' : undefined;
	const showProforma = filters?.billType === 'PROFORMA' ? true : undefined;
	const showConsolidated = filters?.billType === 'CONSOLIDATED' ? 'CONSOLIDATED' : undefined;

	const billDatesStartFilters = 	(filters?.billDate?.startDate === undefined
		|| filters?.billDate?.startDate === null)
		? null : format(filters?.billDate?.startDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const billDatesEndFilters = 	(filters?.billDate?.endDate === undefined
		|| filters?.billDate?.endDate === null)
		? null : format(filters?.billDate?.endDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const dueDatesStartFilters = 	(filters?.dueDate?.startDate === undefined
		|| filters?.dueDate?.startDate === null)
		? null : format(filters?.dueDate?.startDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const dueDatesEndFilters = 	(filters?.dueDate?.endDate === undefined
		|| filters?.dueDate?.endDate === null)
		? null : format(filters?.dueDate?.endDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const updatedDateStartFilters = 	(filters?.updatedDate?.startDate === undefined
		|| filters?.updatedDate?.startDate === null)
		? null : format(filters?.updatedDate?.startDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const updatedDateEndFilters = 	(filters?.updatedDate?.endDate === undefined
		|| filters?.updatedDate?.endDate === null)
		? null : format(filters?.updatedDate?.endDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const billFromData = billDatesStartFilters === null
	&& billDatesEndFilters === null ? undefined : billDatesStartFilters || null;

	const billToData = billDatesStartFilters && billDatesEndFilters === null ? billDatesStartFilters
		: (billDatesStartFilters === null && billDatesEndFilters === null ? undefined : (billDatesEndFilters || null));

	const dueFromData = dueDatesStartFilters === null && dueDatesEndFilters === null
		? undefined : dueDatesStartFilters || null;

	const dueToData = dueDatesStartFilters && dueDatesEndFilters === null ? dueDatesStartFilters
		: (dueDatesStartFilters === null && dueDatesEndFilters === null ? undefined : dueDatesEndFilters || null);

	const updatedFromData = updatedDateStartFilters === null && updatedDateEndFilters === null ? undefined
		: updatedDateStartFilters || null;

	const updatedToData = updatedDateStartFilters && updatedDateEndFilters === null ? updatedDateStartFilters
		: (updatedDateStartFilters === null && updatedDateEndFilters === null ? undefined : updatedDateEndFilters || null);

	const [{ data, loading }, refetch] = useRequestBf(
		{
			url    : '/purchase/bills/list',
			method : 'get',
			params : {
				...filters,
				billDate        : undefined,
				dueDate         : undefined,
				updatedDate     : undefined,
				billDateFrom    : billFromData,
				billDateTo      : billToData,
				dueDateFrom     : dueFromData,
				dueDateTo       : dueToData,
				updatedDateFrom : updatedFromData || filters?.updatedDateFrom || undefined,
				updatedDateTo   : updatedToData || filters?.updatedDateTo || undefined,
				urgencyTag      : filters?.urgencyTag || undefined,
				billType        : showFilter(),
				jobType        	: showConsolidated,
				proforma        : showbillType || showProforma,
				status:
                    currentTab !== 'ALL' && currentTab !== 'Urgency_tag' ? currentTab : undefined,
				isUrgent : tab === 'Urgency_tag' ? true : undefined,
				...sort,
				pageSize : 10,
				entityCode,
			},
			authKey: 'get_purchase_bills_list',
		},
		{ manual: false },
	);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [searchValue]);

	useEffect(() => {
		setFilters((prev) => ({
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
		tab,
		setTab,
		setSearchValue,
		searchValue,
		refetch,
	};
};

export default useGetPurchaseViewList;
