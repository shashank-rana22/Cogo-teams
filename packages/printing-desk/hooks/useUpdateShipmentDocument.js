import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

const useUpdateShipmentDocument = ({ listAPI = () => {} }) => {
	const { t } = useTranslation(['printingDesk']);
	const [{ loading }, trigger] = useRequestAir({
		url     : '/air-coe/documents/weight-amend',
		method  : 'PUT',
		authKey : 'put_air_coe_documents_weight_amend',
	});
	const updateShipment = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success(t('printingDesk:common_success_message3'));
			listAPI();
		} catch (error) {
			Toast.error(error?.response?.data?.message || error?.message || t('printingDesk:common_error_message3'));
		}
	};

	return {
		updateShipment,
		loading,
	};
};

export default useUpdateShipmentDocument;
