import useGetAdvancePaymentView from '../../hooks/useGetAdvancePaymentView';
import useGetAdvPaymentInvoiceList from '../../hooks/useGetAdvPaymentInvoiceList';
import useGetPayrun from '../../hooks/useGetPayrun';
import useGetPayrunBillListView from '../../hooks/useGetPayrunBillListView';
import useGetViewInvoices from '../../hooks/useGetViewInvoices';

const useGetMappingFunctions = ({ activePayrunTab, overseasData, query, globalFilters, sort, selectedPayrun }) => {
	const { payrunData, payrunLoading, payrunStats, getPayrunList } = useGetPayrun({
		activePayrunTab,
		overseasData,
		query,
		globalFilters,
	});
	const {
		getPayrunListView, billListViewData,
		billListViewLoading,
	} = useGetPayrunBillListView({ activePayrunTab, sort, query, globalFilters });
	const {
		getViewInvoice,
		viewInvoiceDataList,
		viewInvoiceDataLoading,
	} = useGetViewInvoices({ activePayrunTab, globalFilters, selectedPayrun, query });
	const {
		getViewInvoicesAdvancePayment, viewInvoicesAdvancePaymentData,
		viewInvoicesAdvancePaymentLoading,
	} = useGetAdvancePaymentView({ globalFilters, selectedPayrun, query });

	const {
		getAdvancePaymentInvoiceList,
		advancePaymentInvoiceList,
		advancePaymentInvoiceLoading,
	} = useGetAdvPaymentInvoiceList({ sort, query, globalFilters, activePayrunTab });

	const getNormalOverseasMapping = (payrunConfig, viewInvoiceConfig, listViewConfig) => ({
		false: {
			getConfig   : payrunConfig,
			getData     : payrunData,
			getLoading  : payrunLoading,
			getFunction : getPayrunList,
			true        : {
				getConfig   : viewInvoiceConfig,
				getData     : viewInvoiceDataList,
				getLoading  : viewInvoiceDataLoading,
				getFunction : getViewInvoice,
			},
		},
		true: {
			getConfig   : listViewConfig,
			getData     : billListViewData,
			getLoading  : billListViewLoading,
			getFunction : getPayrunListView,
			true        : {},
		},
	});

	const getAdvancePaymentMapping = (
		payrunConfig,
		viewInvoiceAdvancePaymentConfig,
		advancePaymentInvoiceListConfig,
	) => ({
		false: {
			getConfig   : payrunConfig,
			getData     : payrunData,
			getLoading  : payrunLoading,
			getFunction : getPayrunList,
			true        : {
				getConfig   : viewInvoiceAdvancePaymentConfig,
				getData     : viewInvoicesAdvancePaymentData,
				getLoading  : viewInvoicesAdvancePaymentLoading,
				getFunction : getViewInvoicesAdvancePayment,
			},
		},
		true: {
			getConfig   : advancePaymentInvoiceListConfig,
			getData     : advancePaymentInvoiceList,
			getLoading  : advancePaymentInvoiceLoading,
			getFunction : getAdvancePaymentInvoiceList,
			true        : {},
		},
	});

	return {
		getNormalOverseasMapping,
		getAdvancePaymentMapping,
		payrunStats,
	};
};

export default useGetMappingFunctions;
