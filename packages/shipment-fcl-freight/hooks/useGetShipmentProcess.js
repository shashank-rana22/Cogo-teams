import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetShipmentProcess() {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/get_process',
		method : 'GET',
	}, { manual: true });

	const getProcessConfigs = async () => {
		try {
			const res = await trigger({
				params: {
					status: 'active',
				},
			}); if (!res.hasError) {
				// Toast.error('dsfghj');
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getProcessConfigs();
	}, []);

	return {
		loading,
		data: data?.data?.services_config,
	};
}

export default useGetShipmentProcess;
// TODO
