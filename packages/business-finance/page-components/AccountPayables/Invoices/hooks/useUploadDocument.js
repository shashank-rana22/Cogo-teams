import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

const API_ARRAY_VARIABLE_ONE = 1;

const useUploadDocuments = (fileUploader) => {
	const { query } = useRouter();
	const { singleFileUpload, fileBank, multiFileUpload } = fileUploader;

	const { payrun } = query;

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun/upload-documents',
			method  : 'post',
			authKey : 'post_purchase_payrun_upload_documents',
		},
		{ manual: false },
	);

	const listPayrunBill = useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill',
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

	const upload = async (setActive = () => {}) => {
		const formattedUrls = multiFileUpload?.map((item) => item);

		try {
			await trigger({
				data: {
					payrunId              : payrun,
					taxDeclarationFormUrl : singleFileUpload || undefined,
					bankFormUrl           : fileBank || undefined,
					otherDocumentsUrl     : formattedUrls || undefined,
				},
			});
			Toast.success('File successfully uploaded');
			setActive('final_confirmation');
		} catch (e) {
			Toast.error(e?.error?.message || 'Failed to upload');
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

	const deleteTaggedDocuments = async (key, myArray = null) => {
		let payload;
		if (key === 'otherDocumentsUrl') {
			payload = {
				payrunId : payrun,
				key,
				url      : myArray[GLOBAL_CONSTANTS.zeroth_index],
			};
		} else {
			payload = {
				payrunId: payrun,
				key,
			};
		}
		try {
			await delete_tagged_documents[API_ARRAY_VARIABLE_ONE]({
				data: payload,
			});

			Toast.success(`${key} Deleted successfully`);
			generateInvoice();
		} catch (e) {
			toastApiError(e);
		}
	};

	useEffect(() => {
		generateInvoice();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		upload,
		loading,
		data,
		listData    : listPayrunBill[GLOBAL_CONSTANTS.zeroth_index].data,
		listLoading : listPayrunBill[GLOBAL_CONSTANTS.zeroth_index].loading,
		deleteTaggedDocuments,
	};
};

export default useUploadDocuments;
