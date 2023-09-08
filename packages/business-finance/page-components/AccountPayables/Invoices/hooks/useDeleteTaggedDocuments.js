import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../../commons/toastApiError.ts';

const useDeleteTaggedDocuments = ({ generateInvoice = () => {} }) => {
	const { query = {} } = useSelector(({ general }) => ({ query: general.query }));

	const { payrun = '' } = query || {};

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun/documents',
			method  : 'delete',
			authKey : 'delete_purchase_payrun_documents',
		},
		{ manual: false },
	);

	const deleteTaggedDocuments = async (itemData = {}) => {
		let key;

		if (itemData.docName === 'Purchase Invoices') {
			key = 'billPdfUrl';
		} else if (itemData.docName === 'Shipment Documents') {
			key = 'shipmentPdfUrl';
		}

		try {
			await trigger({
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

	const deleteUploadTaggedDocuments = async (key = '', myArray = null) => {
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
			await trigger({
				data: payload,
			});

			Toast.success(`${key} Deleted successfully`);
			generateInvoice();
		} catch (e) {
			toastApiError(e);
		}
	};

	return {
		deleteTaggedDocuments,
		deleteUploadTaggedDocuments,
		deleteTaggedDocumentsLoading: loading,
	};
};

export default useDeleteTaggedDocuments;
