import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useState } from 'react';

interface InvoiceAdditionals {
	reqAgreementDate?: string
	reqAgreementNumber?: string
	reqCancelReason?: string
	reqDocumentUrl?: string
}
interface InvoiceData {
	invoiceAdditionals?: InvoiceAdditionals
}

interface IrnCancellationProps {
	id?: string;
	entityCode?: string;
	setShowCancellationModal?: Function;
	refetch?: Function;
	itemData?: InvoiceData
}

const useGetIrnCancellation = ({
	id,
	setShowCancellationModal,
	refetch,
	entityCode,
	itemData = {},
}: IrnCancellationProps) => {
	const [response, setResponse] = useState({
		remarks           : itemData?.invoiceAdditionals?.reqCancelReason,
		value             : '',
		agreementDocument : itemData?.invoiceAdditionals?.reqDocumentUrl,
		agreementNumber   : itemData?.invoiceAdditionals?.reqAgreementNumber,
		agreementDate     : new Date(itemData?.invoiceAdditionals?.reqAgreementDate),
	});
	const [
		{ loading },
		cancelIrnApi,
	] = useRequestBf(
		{
			url     : `/sales/invoice/${id}/irn-cancel`,
			method  : 'post',
			authKey : 'post_sales_invoice_by_id_irn_cancel',
		},
		{ manual: true },
	);

	const CANCEL_IRN = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode]?.feature_supported?.includes('cancel_irn');

	const CANCEL_EINVOICE =	 GLOBAL_CONSTANTS.cogoport_entities?.[entityCode]
		?.feature_supported?.includes('cancel_e_invoice');

	const onSubmit = async () => {
		try {
			let payload = {};

			if (CANCEL_EINVOICE) {
				payload = {
					cancelReason      : response?.remarks,
					agreementDocument : response?.agreementDocument,
					agreementNumber   : response?.agreementNumber,
					agreementDate     : response?.agreementDate,
				};
			} else if (CANCEL_IRN) {
				payload = {
					cancelReason   : response?.value,
					cancelReminder : response?.remarks,
				};
			}

			const resp = await cancelIrnApi({
				data: payload,
			});

			if (resp.status === 200) {
				Toast.success('IRN Cancelled Successfully');
				setShowCancellationModal(false);
			}
			refetch();
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	return {
		onSubmit,
		loading,
		setResponse,
		response,
	};
};

export default useGetIrnCancellation;
