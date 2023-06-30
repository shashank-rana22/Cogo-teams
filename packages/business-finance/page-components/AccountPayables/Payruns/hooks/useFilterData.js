import { useEffect } from 'react';

import { initiatedConfig } from '../columns/initiatedConfig';
import { initiatedListViewConfig } from '../columns/initiatedListViewConfig';

import useGetPayrun from './useGetPayrun';
import useGetPayrunBillListView from './useGetPayrunBillListView';

const useFilterData = ({ isInvoiceView, activePayrunTab }) => {
	const { payrunData, payrunLoading, payrunStats, getPayrunList } = useGetPayrun({ activePayrunTab });
	const { getPayrunListView, billListViewData, billListViewLoading } = useGetPayrunBillListView({ activePayrunTab });
	let config = initiatedConfig;
	useEffect(() => {
		if (isInvoiceView) {
			getPayrunListView();
		} else {
			getPayrunList();
		}
	}, [getPayrunList, getPayrunListView, isInvoiceView]);
	let data = {};
	let loading = false;
	if (isInvoiceView) {
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
