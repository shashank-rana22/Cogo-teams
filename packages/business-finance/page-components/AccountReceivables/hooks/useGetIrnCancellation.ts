import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useState } from 'react';

interface IrnCancellationProps {
	id?: string;
	entityCode?: string;
	setShowCancellationModal?: Function;
	refetch?: Function;
}
interface Values {
	agreementNumber?: string;
	agreementDate?: string;
	agreementPdfFile?: AgreementPdfFile;
	remarks?: string;
	value?: string;
}

interface AgreementPdfFile {
	finalUrl?: string;
}

const useGetIrnCancellation = ({
	id,
	setShowCancellationModal,
	refetch,
	entityCode,
}: IrnCancellationProps) => {
	const [response, setResponse] = useState({
		remarks	: '',
		value  	: '',
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

	const onSubmit = async (values: Values) => {
		const {
			agreementNumber,
			agreementDate,
			agreementPdfFile,
		} = values || {};
		const { finalUrl } = agreementPdfFile || {};

		try {
			let PAYLOAD = {};
			if (CANCEL_EINVOICE) {
				PAYLOAD = {
					cancelReason      : response?.remarks || undefined,
					agreementNumber   : agreementNumber || undefined,
					agreementDate     : agreementDate || undefined,
					agreementDocument : finalUrl || undefined,
				};
			} else if (CANCEL_IRN) {
				PAYLOAD = {
					cancelReason   : response?.value,
					cancelReminder : response?.remarks,
				};
			}
			const resp = await cancelIrnApi({
				data: PAYLOAD,
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
