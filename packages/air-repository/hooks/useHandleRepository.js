import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

const useHandleRepository = (edit) => {
	const { t } = useTranslation(['airRepository']);
	const api = edit ? '/update_shipment_service_ops_repository' : '/create_shipment_service_ops_repository';

	const [{ loading }, trigger] = useRequest({
		url    : `${api}`,
		method : 'POST',
	});

	const handleRepository = async ({ payload, listRepository, setShowModal = () => {} }) => {
		try {
			await trigger({
				data: payload,
			});
			listRepository();
			setShowModal(false);
			Toast.success(`${t('airRepository:repository')} ${edit
				? t('airRepository:updated') : t('airRepository:created')} ${t('airRepository:successfully')}`);
		} catch (err) {
			Toast.error(err?.response?.data?.base || err?.message || t('airRepository:failed_to_upload'));
		}
	};

	return {
		handleRepository,
		loading,
	};
};
export default useHandleRepository;
