import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

const useCreateShipmentDocument = () => {
	const { t } = useTranslation(['printingDesk']);
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/documents',
			method  : 'POST',
			authKey : 'post_air_coe_documents',
		},
	);

	const createDocument = async (payload, listAPI) => {
		try {
			await trigger({
				data: payload,
			});
			listAPI({ filters: {} });

			Toast.success(t('printingDesk:common_success_doc_created_message'));
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		createDocument,
		loading,
	};
};
export default useCreateShipmentDocument;
