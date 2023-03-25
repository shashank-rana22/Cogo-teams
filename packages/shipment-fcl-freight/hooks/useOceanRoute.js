import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useOceanRoute = ({ setMapPoints = () => {}, list = {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/get_container_sea_route',
		method : 'POST',
	}, { manual: true });

	const getAllOceanRoutes = useCallback(() => {
		(async () => {
			try {
				const container_no = list?.container_details?.map((c) => c?.container_no)
					.flat();
				const request_data = {
					saas_container_subscriptions: [
						{
							saas_container_subscription_id : list?.id,
							type                           : list?.type,
							container_no,
						},
					],
				};
				const res = await trigger({ data: request_data });
				if (res.data?.length) {
					container_no?.forEach((c) => {
						const container = res?.data?.filter((r) => r.container_no === c);
						if (container.length > 0) {
							const test_points = container?.map((a) => a.data).flat();
							const pre_points = test_points.filter((point) => point);
							setMapPoints((prevPoints) => [
								...prevPoints,
								{
									container_no : c,
									route        : pre_points,
								},
							]);
						}
					});
				}
				return res.data;
			} catch (err) {
				return [];
			}
		})();
	}, [list?.container_details, list?.id, list?.type, trigger, setMapPoints]);

	useEffect(() => {
		if (!isEmpty(list)) {
			getAllOceanRoutes();
		}
	}, [getAllOceanRoutes, list]);

	return {
		routesLoading: loading,
	};
};

export default useOceanRoute;
// TODO
