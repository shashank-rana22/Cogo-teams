import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const API_ARRAY_VARIABLE_ONE = 1;

const useListTaggedInvoices = () => {
	// const { query } = useRouter();

	const {
		query,
		performedBy,
		performedByType,
		performedByName,
	} = useSelector(({ general, profile }) => ({
		query           : general.query,
		performedBy     : profile.user.id,
		performedByType : profile.session_type,
		performedByName : profile.user.name,
	}));

	const [params, setParams] = useState({
		pageIndex : 1,
		pageSize  : 10,
	});

	const { payrun, entity } = query;

	const listPayrunBill = useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill',
		},
		{ manual: false },
	);

	const mergedPdfById = useRequestBf(
		{
			url     : `/purchase/payrun/merged-pdf/${payrun}`,
			method  : 'post',
			authKey : 'post_purchase_payrun_merged_pdf',
		},
		{ manual: false },
	);

	const delete_payrun_invoice = useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'delete',
			authKey : 'delete_purchase_payrun_bill',
		},
		{ manual: false },
	);

	const saveBank = useRequestBf(
		{
			url     : '/purchase/payrun-bill/allot-bank',
			method  : 'post',
			authKey : 'post_purchase_payrun_bill_allot_bank',
		},
		{ manual: false },
	);

	const delete_tagged_documents = useRequestBf(
		{
			url     : '/purchase/payrun/documents',
			method  : 'delete',
			authKey : 'delete_purchase_payrun_documents',
		},
		{ manual: false },
	);

	const selectBank = async (id, callback = () => {}) => {
		try {
			await saveBank[API_ARRAY_VARIABLE_ONE]({
				data: {
					bankId   : id,
					payrunId : payrun,
					entity,
					performedByName,
					performedBy,
					performedByType,
					billIds  : [],
				},
			});
			callback();
			Toast.success('Bank Save Successfully');
		} catch (e) {
			Toast.error('Please Select bank');
		}
	};

	const generateInvoice = async () => {
		try {
			listPayrunBill[API_ARRAY_VARIABLE_ONE]({
				params: {
					payrunId  : payrun,
					pageSize  : 10,
					pageIndex : 1,
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Failed to Fetch Data');
		}
	};
	const deleteInvoices = async (id) => {
		try {
			await delete_payrun_invoice.trigger({
				data: {
					id,
					performedBy,
					performedByType,
					performedByName,
				},
			});

			Toast.success('Invoice deleted successfully');
			generateInvoice();
		} catch (e) {
			Toast.error(e?.data?.message);
		}
	};
	const deleteTaggedDocuments = async (itemData) => {
		let key;

		if (itemData.docName === 'Purchase Invoices') {
			key = 'billPdfUrl';
		} else if (itemData.docName === 'Shipment Documents') {
			key = 'shipmentPdfUrl';
		}

		try {
			await delete_tagged_documents.trigger({
				data: {
					payrunId: payrun,
					key,
				},
			});

			Toast.success(`${itemData.docName} Deleted successfully`);
			generateInvoice();
		} catch (e) {
			Toast.error(e?.data?.message);
		}
	};
	useEffect(() => {
		generateInvoice();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const mergeInvoices = async () => {
		try {
			await mergedPdfById[API_ARRAY_VARIABLE_ONE]({ data: {} });
			generateInvoice();
		} catch (e) {
			Toast.error(e?.error?.message || 'Failed to Merge');
		}
	};

	return {
		data            : listPayrunBill[GLOBAL_CONSTANTS.zeroth_index].data,
		loadingList     : listPayrunBill[GLOBAL_CONSTANTS.zeroth_index].loading,
		loadingMerged   : mergedPdfById[GLOBAL_CONSTANTS.zeroth_index].loading,
		generateInvoice,
		mergeInvoices,
		deleteInvoices,
		selectBank,
		setParams,
		deleteTaggedDocuments,
		loadingSaveBank : saveBank.loading,
		params,
	};
};

export default useListTaggedInvoices;
