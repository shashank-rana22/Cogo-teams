import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequestAir } from '@cogoport/request';

const usePutAirCoeAirFreight = ({
	amsDataApiTrigger = () => {},
}) => {
	const [{ loading }, trigger] = useRequestAir({
		url     : '/air-coe/air-freight',
		method  : 'PUT',
		authKey : 'put_air_coe_air_freight',
	}, { manual: true });

	const apiTrigger = async ({
		payload = {},
	}) => {
		try {
			await trigger({
				data: payload,
			});
			amsDataApiTrigger();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default usePutAirCoeAirFreight;
