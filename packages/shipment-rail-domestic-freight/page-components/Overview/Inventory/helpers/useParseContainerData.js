import { useState, useEffect } from 'react';

const useParseContainerData = (data) => {
	const [routeList, setRouteList] = useState([]);
	const [routeInformation, setRouteInformation] = useState([]);

	useEffect(() => {
		const list = (data?.list || [])
			?.filter((container) => container?.container_number)
			?.reduce((acc, container, containerIdx) => {
				const result = [...acc];
				const tcontainer = container;
				tcontainer.name = data?.route?.[containerIdx]?.name;
				tcontainer.site_code = data?.route?.[containerIdx]?.site_code;
				tcontainer.loading_status = tcontainer.loading_status || 'empty';
				tcontainer.route = (data?.route ?? []).reduce((tacc, tpoint, tidx) => {
					let ttacc = tacc;
					if (tidx === 0) {
						ttacc = [
							{
								...tpoint,
								origin_location_id      : tpoint?.id,
								destination_location_id : undefined,
							},
						];
					} else {
						ttacc = [
							...ttacc,
							{
								origin_location_id      : data?.route?.[tidx - 1]?.id,
								destination_location_id : data?.route?.[tidx]?.id,
								name                    : 'Transit',
							},
							{
								...tpoint,
								origin_location_id      : tpoint?.id,
								destination_location_id : undefined,
							},
						];
					}
					return ttacc;
				}, []);
				result.push(tcontainer);
				return result;
			}, []);

		list.forEach((container, idx) => {
			let checkedIdx = 0;
			if (list?.[idx]) list[idx].isChecked = false;
			checkedIdx = data?.route?.findIndex(
				(location) => location?.id === container?.origin_location?.id,
			);
			if (checkedIdx >= 0 && container?.destination_location?.id) {
				checkedIdx = Math.min(2 * checkedIdx + 1, container.route.length - 1);
				list[idx].isChecked = {
					static : container?.movement_type === 'static',
					item   : {
						...(data?.route?.[checkedIdx] ?? {}),
						origin_location_id      : container?.origin_location_id,
						destination_location_id : container?.destination_location_id,
					},
					index: checkedIdx,
				};
			} else if (checkedIdx >= 0) {
				list[idx].isChecked = {
					static : container?.movement_type === 'static',
					item   : {
						...(data?.route?.[checkedIdx] ?? {}),
						origin_location_id      : container?.origin_location_id,
						destination_location_id : container?.destination_location_id,
					},
					index: 2 * checkedIdx,
				};
			}
		}, []);
		setRouteInformation({ route: data?.route ?? [], stats: data?.stats ?? {} });
		setRouteList(list);
	}, [data]);

	return {
		routeList,
		setRouteList,
		routeInformation,
		setRouteInformation,
	};
};

export default useParseContainerData;
