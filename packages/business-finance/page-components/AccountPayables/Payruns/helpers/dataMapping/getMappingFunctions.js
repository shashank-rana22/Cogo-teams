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

	const listInoiceCommonConfig = ({
		getData     : billListViewData,
		getLoading  : billListViewLoading,
		getFunction : getPayrunListView,
		true        : {},
	});
	const viewInvoiceCommonConfig = ({
		getData     : viewInvoiceDataList,
		getLoading  : viewInvoiceDataLoading,
		getFunction : getViewInvoice,
	});
	const payrunCommonConfig = ({
		getData     : payrunData,
		getLoading  : payrunLoading,
		getFunction : getPayrunList,
	});

	const advancePaymentViewInvoiceCommonConfig = ({
		getData     : viewInvoicesAdvancePaymentData,
		getLoading  : viewInvoicesAdvancePaymentLoading,
		getFunction : getViewInvoicesAdvancePayment,
	});

	const advancePaymentListView = ({
		getData     : advancePaymentInvoiceList,
		getLoading  : advancePaymentInvoiceLoading,
		getFunction : getAdvancePaymentInvoiceList,
		true        : {},
	});

	return {
		listInoiceCommonConfig,
		viewInvoiceCommonConfig,
		payrunCommonConfig,
		advancePaymentViewInvoiceCommonConfig,
		advancePaymentListView,
		payrunStats,
	};
};

export default useGetMappingFunctions;
