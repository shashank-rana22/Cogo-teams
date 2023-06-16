import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';

interface IrnCancellationProps {
	id?: string;
	entityCode?: string;
	setShowCancellationModal?: Function;
	refetch?: Function;
	responseRemark?: {
		remarks?: string;
	};
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
	responseRemark,
}: IrnCancellationProps) => {
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

	const RADIO_GROUP = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode]?.feature_supported?.includes('radio_mapping');

	const TEXT_AREA = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode]?.feature_supported?.includes('text_mapping');

	const { remarks: remarkEntry } = responseRemark;

	const onSubmit = async (values: Values) => {
		const {
			agreementNumber,
			agreementDate,
			agreementPdfFile,
			remarks,
			value,
		} = values || {};
		const { finalUrl } = agreementPdfFile || {};

		try {
			let PAYLOAD = {};
			if (TEXT_AREA) {
				PAYLOAD = {
					cancelReason      : remarkEntry || undefined,
					agreementNumber   : agreementNumber || undefined,
					agreementDate     : agreementDate || undefined,
					agreementDocument : finalUrl || undefined,
				};
			} else if (RADIO_GROUP) {
				PAYLOAD = {
					cancelReason   : value,
					cancelReminder : remarks,
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
	};
};

export default useGetIrnCancellation;
