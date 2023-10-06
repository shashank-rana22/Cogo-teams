import { Toast } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import { useRequestBf } from '@cogoport/request';
import { useState } from 'react';

const useGetIrnCancellation = ({
	id,
	setShowCancellationModal,
	refetch,
	entityCode,
	itemData = {},
}) => {
	const [response, setResponse] = useState({
		remarks           : itemData?.invoiceAdditionals?.reqCancelReason,
		value             : '',
		agreementDocument : itemData?.invoiceAdditionals?.reqCancelDocumentUrl
		|| itemData?.invoiceAdditionals?.reqReplaceDocumentUrl,
		agreementNumber : '',
		agreementDate   : new Date(),
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

	const { irn_label:irnLabel } = ENTITY_FEATURE_MAPPING[entityCode].labels;

	const CANCEL_IRN = ENTITY_FEATURE_MAPPING[entityCode]?.feature_supported?.includes('cancel_irn');

	const CANCEL_EINVOICE =	 ENTITY_FEATURE_MAPPING[entityCode]
		?.feature_supported?.includes('cancel_e_invoice');

	const onSubmit = async () => {
		try {
			let payload = {};

			if (CANCEL_EINVOICE) {
				payload = {
					cancelReason      : response?.remarks,
					agreementDocument : response?.agreementDocument,
					agreementNumber   : response?.agreementDocument ? response?.agreementNumber : undefined,
					agreementDate     : response?.agreementDocument ? response?.agreementDate : undefined,
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
				Toast.success(`${irnLabel} Cancelled Successfully`);
				setShowCancellationModal(false);
			}
			refetch();
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
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
