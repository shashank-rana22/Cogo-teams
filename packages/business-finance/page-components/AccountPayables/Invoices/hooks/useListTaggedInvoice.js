import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

const API_ARRAY_VARIABLE_ONE = 1;

const useListTaggedInvoices = () => {
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

	const [{ data, loading }, Trigger] = useRequestBf(
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
			toastApiError('Please Select bank');
		}
	};

	const generateInvoice = useCallback(async () => {
		try {
			Trigger({
				params: {
					payrunId  : payrun,
					pageSize  : 10,
					pageIndex : 1,
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Failed to Fetch Data');
		}
	}, [payrun, Trigger]);
	const deleteInvoices = async (id) => {
		try {
			await delete_payrun_invoice[API_ARRAY_VARIABLE_ONE]({
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
			toastApiError(e);
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
			await delete_tagged_documents[API_ARRAY_VARIABLE_ONE]({
				data: {
					payrunId: payrun,
					key,
				},
			});

			Toast.success(`${itemData.docName} Deleted successfully`);
			generateInvoice();
		} catch (e) {
			toastApiError(e);
		}
	};
	useEffect(() => {
		generateInvoice();
	}, [generateInvoice]);

	const mergeInvoices = async () => {
		try {
			await mergedPdfById[API_ARRAY_VARIABLE_ONE]({ data: {} });
			generateInvoice();
		} catch (e) {
			toastApiError(e);
		}
	};

	return {
		data,
		loadingList     : loading,
		loadingMerged   : mergedPdfById[GLOBAL_CONSTANTS.zeroth_index].loading,
		generateInvoice,
		mergeInvoices,
		deleteInvoices,
		selectBank,
		setParams,
		deleteTaggedDocuments,
		loadingSaveBank : saveBank[GLOBAL_CONSTANTS.zeroth_index].loading,
		params,
	};
};

export default useListTaggedInvoices;
