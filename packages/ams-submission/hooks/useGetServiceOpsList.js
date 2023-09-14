import toastApiError from '@cogoport/air-modules/utils/toastApiError';
// import { useRouter } from '@cogoport/next';
import { useRequestAir } from '@cogoport/request';

const useGetServiceOpsList = () => {
	// const router = useRouter();
	const [{ data = {}, loading }, trigger] = useRequestAir({
		url     : '/air-coe/service-ops/list',
		method  : 'GET',
		authKey : 'get_air_coe_service_ops_list',
	}, { manual: true });

	const apiTrigger = async ({ payload = {}, setModalData = () => {} }) => {
		try {
			await trigger({
				params: payload,
			});
			setModalData({});
			// router.push(data?.);
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

export default useGetServiceOpsList;
