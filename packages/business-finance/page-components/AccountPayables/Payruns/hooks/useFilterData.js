import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { PAYRUN_AUDITED_PAYMENT_READY } from '../columns/initiatedConfig';
import useGetConfigDataMapping from '../helpers/dataMapping/getConfigDataMapping';

const PAYRUN_INNER_TAB_NAME = ['INITIATED', 'AUDITED', 'PAYMENT_INITIATED', 'COMPLETED'];

const getRefetch = ({ activePayrunTab, selectedPayrun, getViewInvoiceFunction = () => {}, getFunction = () => {} }) => {
	if (PAYRUN_INNER_TAB_NAME.includes(activePayrunTab) && !isEmpty(selectedPayrun)) {
		return getViewInvoiceFunction;
	}
	return getFunction;
};

const useFilterData = ({
	isInvoiceView,
	activePayrunTab,
	overseasData,
	setOverseasData,
	setViewId,
	setCheckedRow,
	activeEntity = '',
}) => {
	const [globalFilters, setGlobalFilters] = useState({
		search    : undefined,
		pageIndex : 1,
		pageSize  : 10,
		activeEntity,
	});

	const [sort, setSort] = useState({});
	const [apiData, setApiData] = useState({
		listData    : {},
		dataLoading : false,
		listConfig  : PAYRUN_AUDITED_PAYMENT_READY,
	});

	const [selectedPayrun, setSelectedPayrun] = useState(null);
	const [selectedIds, setSelectedIds] = useState([]);
	const { search } = globalFilters || {};
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	const { configMapping, payrunStats, country_code } = useGetConfigDataMapping({
		activePayrunTab,
		overseasData,
		query,
		globalFilters,
		sort,
		selectedPayrun,
	});

	const selectConfigDataKeyMapping = {
		INITIATED      : configMapping[activePayrunTab][isInvoiceView],
		UPLOAD_HISTORY : configMapping[activePayrunTab],
		PAID           : configMapping[activePayrunTab][overseasData],
		default        : configMapping?.[activePayrunTab]?.[overseasData]?.[isInvoiceView],
	};

	const selctedConfigData = selectConfigDataKeyMapping[activePayrunTab] || selectConfigDataKeyMapping.default;

	const { getFunction = () => {}, getConfig, getData, getLoading, true: getViewDetails } = selctedConfigData || {};

	const {
		getFunction: getViewInvoiceFunction, getConfig: getViewInvoiceConfig,
		getData: getViewInvoiceData, getLoading: getViewInvoiceLoading,
	} = getViewDetails || {};

	useEffect(() => {
		if (PAYRUN_INNER_TAB_NAME.includes(activePayrunTab) && !isEmpty(selectedPayrun)) {
			return getViewInvoiceFunction();
		}
		return getFunction();
	}, [activePayrunTab, overseasData, isInvoiceView, selectedPayrun, getViewInvoiceFunction, getFunction]);

	useEffect(() => {
		if (PAYRUN_INNER_TAB_NAME.includes(activePayrunTab) && !isEmpty(selectedPayrun)) {
			return setApiData({
				listData    : getViewInvoiceData,
				dataLoading : getViewInvoiceLoading,
				listConfig  : getViewInvoiceConfig,
			});
		}
		return setApiData({
			listData    : getData,
			dataLoading : getLoading,
			listConfig  : getConfig,
		});
	}, [activePayrunTab, isInvoiceView, overseasData, selectedPayrun, getData, getLoading, getViewInvoiceConfig,
		getConfig, getViewInvoiceData, getViewInvoiceLoading]);

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
			activeEntity,
		});
	}, [activePayrunTab, setCheckedRow, setOverseasData, setViewId, activeEntity]);

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
		refetch : getRefetch({ activePayrunTab, selectedPayrun, getViewInvoiceFunction, getFunction }),
		selectedIds,
		setSelectedIds,
		country_code,
	};
};

export default useFilterData;
