import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';
import { useRouter } from 'next/router';

const useGetAirlineConfigList = () => {
	const router = useRouter();
	const [{ data = {}, loading }, trigger] = useRequestAir({
		url     : '/air-coe/airline-config/list',
		method  : 'GET',
		authKey : 'get_air_coe_airline_config_list',
	}, { manual: true });

	const apiTrigger = async ({ payload = {}, setModalData = () => {} }) => {
		try {
			await trigger({
				params: payload,
			});
			setModalData({});

			if (data?.lmsUrl) {
				router.push(data?.lmsUrl, data?.lmsUrl);
			} else {
				Toast.error('Something went wrong');
			}
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
