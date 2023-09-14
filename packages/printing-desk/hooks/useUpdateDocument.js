import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

const useUpdateShipmentDocument = () => {
	const { t } = useTranslation(['printingDesk']);
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/documents',
			method  : 'PUT',
			authKey : 'put_air_coe_documents',
		},
	);

	const updateDocument = async (payload, listAPI) => {
		try {
			await trigger({
				data: payload,
			});
			listAPI({});
			Toast.success(t('printingDesk:common_success_doc_approved_message'));
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		updateDocument,
		loading,
	};
};
export default useUpdateShipmentDocument;
