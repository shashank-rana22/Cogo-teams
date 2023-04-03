import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useOceanRoute = ({
	setMapPoints = () => {},
	container_no = [],
	saas_container_subscription_id = '',
	type = '',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/get_container_sea_route',
		method : 'POST',
	}, { manual: true });

	const getAllOceanRoutes = useCallback(() => {
		(async () => {
			try {
				const request_data = {
					saas_container_subscriptions: [
						{
							saas_container_subscription_id,
							type,
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
	}, [saas_container_subscription_id, type, trigger, setMapPoints]);

	useEffect(() => {
		if (!isEmpty(saas_container_subscription_id)) {
			getAllOceanRoutes();
		}
	}, [getAllOceanRoutes, saas_container_subscription_id]);

	return {
		routesLoading: loading,
	};
};

export default useOceanRoute;
// TODO
