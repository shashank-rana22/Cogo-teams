import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { PAYRUN_AUDITED_PAYMENT_READY } from '../columns/initiatedConfig';
import useGetConfigDataMapping from '../helpers/dataMapping/getConfigDataMapping';

const PAYRUN_INNER_TAB_NAME = ['INITIATED', 'AUDITED', 'PAYMENT_INITIATED', 'COMPLETED'];

const useFilterData = ({
	isInvoiceView,
	activePayrunTab,
	overseasData,
	setOverseasData,
	setViewId,
	setCheckedRow,
}) => {
	const [globalFilters, setGlobalFilters] = useState({
		search    : undefined,
		pageIndex : 1,
		pageSize  : 10,
	});

	const [sort, setSort] = useState({});
	const [apiData, setApiData] = useState({
		listData    : {},
		dataLoading : false,
		listConfig  : PAYRUN_AUDITED_PAYMENT_READY,
	});
	const [refetch, setRefetch] = useState(() => () => {});

	const [selectedPayrun, setSelectedPayrun] = useState(null);
	const [selectedIds, setSelectedIds] = useState([]);
	const { search } = globalFilters || {};
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	const { configMapping, payrunStats } = useGetConfigDataMapping({
		activePayrunTab,
		overseasData,
		query,
		globalFilters,
		sort,
		selectedPayrun,

	});

	const selectConfigDataMapping = {
		INITIATED      : configMapping[activePayrunTab][isInvoiceView],
		UPLOAD_HISTORY : configMapping[activePayrunTab],
		PAID           : configMapping[activePayrunTab][overseasData],
		default        : configMapping?.[activePayrunTab]?.[overseasData]?.[isInvoiceView],
	};
	const filteredTab = selectConfigDataMapping[activePayrunTab] || selectConfigDataMapping.default;

	const { getFunction, true: getViewDetails } = filteredTab || {};
	const { getFunction: getViewInvoiceFunction } = getViewDetails || {};

	useEffect(() => {
		if (PAYRUN_INNER_TAB_NAME.includes(activePayrunTab) && !isEmpty(selectedPayrun)) {
			getViewInvoiceFunction();
			setRefetch(() => () => {
				getViewInvoiceFunction();
			});
		} else {
			getFunction();
			setRefetch(() => () => {
				getFunction();
			});
		}
	}, [activePayrunTab, overseasData, isInvoiceView, selectedPayrun,
		getViewInvoiceFunction, getFunction]);

	useEffect(() => {
		if (PAYRUN_INNER_TAB_NAME.includes(activePayrunTab) && !isEmpty(selectedPayrun)) {
			setApiData({
				listData    : filteredTab.true.getData,
				dataLoading : filteredTab.true.getLoading,
				listConfig  : filteredTab.true.getConfig,
			});
		} else {
			setApiData({
				listData    : filteredTab.getData,
				dataLoading : filteredTab.getLoading,
				listConfig  : filteredTab.getConfig,
			});
		}
	}, [activePayrunTab, isInvoiceView, overseasData, selectedPayrun, filteredTab?.getData,
		filteredTab?.getLoading, filteredTab?.true?.getConfig, filteredTab?.getConfig, filteredTab?.true?.getData,
		filteredTab?.true?.getLoading]);

	useEffect(() => {
		setOverseasData('NORMAL');
		setViewId('');
		setSelectedPayrun(null);
		setCheckedRow(null);
		setSelectedIds([]);
		setGlobalFilters({
			search    : undefined,
			pageIndex : 1,
			pageSize  : 10,
		});
	}, [activePayrunTab, setCheckedRow, setOverseasData, setViewId]);

	return {
		data    : apiData.listData,
		loading : apiData.dataLoading,
		payrunStats,
		config  : apiData.listConfig,
		globalFilters,
		setGlobalFilters,
		sort,
		setSort,
		setSelectedPayrun,
		selectedPayrun,
		refetch,
		selectedIds,
		setSelectedIds,
	};
};

export default useFilterData;
