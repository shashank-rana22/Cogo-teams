import { useEffect } from 'react';

import { initiatedConfig } from '../columns/initiatedConfig';
import { initiatedListViewConfig } from '../columns/initiatedListViewConfig';
import { uploadHistoryConfig } from '../columns/uploadHistoryConfig';

import useGetPayrun from './useGetPayrun';
import useGetPayrunBillListView from './useGetPayrunBillListView';
import useGetUploadHistoryList from './useGetUploadHistoryList';

const useFilterData = ({ isInvoiceView, activePayrunTab, overseasData }) => {
	const { payrunData, payrunLoading, payrunStats, getPayrunList } = useGetPayrun({ activePayrunTab, overseasData });
	const { getPayrunListView, billListViewData, billListViewLoading } = useGetPayrunBillListView({ activePayrunTab });
	const { getUploadHistoryList, uploadHistoryListLoading, uploadHistoryDataList } = useGetUploadHistoryList();

	let config = initiatedConfig;
	let data = {};
	let loading = false;

	useEffect(() => {
		if (activePayrunTab === 'UPLOAD_HISTORY') {
			getUploadHistoryList();
		} else if (isInvoiceView) {
			getPayrunListView();
		} else {
			getPayrunList();
		}
	}, [activePayrunTab, getPayrunList, getPayrunListView, getUploadHistoryList, isInvoiceView]);

	if (activePayrunTab === 'UPLOAD_HISTORY') {
		data = uploadHistoryDataList;
		loading = uploadHistoryListLoading;
		config = uploadHistoryConfig;
	} else if (isInvoiceView) {
		data = billListViewData;
		loading = billListViewLoading;
		config = initiatedListViewConfig;
	} else {
		data = payrunData;
		loading = payrunLoading;
	}

	return {
		data,
		loading,
		payrunStats,
		config,
	};
};

export default useFilterData;
