import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

const useGetAirlineConfigList = ({
	amsDataApiTrigger = () => {},
}) => {
	const { t } = useTranslation(['amsSubmission']);

	const [{ data = {}, loading }, trigger] = useRequestAir({
		url     : '/air-coe/airline-config/list',
		method  : 'GET',
		authKey : 'get_air_coe_airline_config_list',
	}, { manual: true });

	const apiTrigger = async ({
		payload = {},
		setModalData = () => {},
	}) => {
		try {
			const res = await trigger({
				params: payload,
			});

			if (res?.data?.data?.lmsUrl) {
				window.open(res?.data?.data?.lmsUrl, '_blank');
			} else {
				Toast.error(t('amsSubmission:toast_error'));
			}

			amsDataApiTrigger();
			setModalData({});
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		data,
		apiTrigger,
		loading,
	};
};

export default useGetAirlineConfigList;
