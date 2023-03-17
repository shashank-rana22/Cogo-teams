/* eslint-disable no-param-reassign */
export const helperFuncs = (serviceList) => {
	let check = false;
	let serviceAvailable = {};
	const renderItem = (routeService, serviceObj) => {
		serviceAvailable = (serviceList || []).find(
			(element) => routeService?.service_types?.[0] === element?.display_service_type
				&& element?.trade_type === routeService.trade_type,
		);

		serviceAvailable = {
			...(serviceAvailable || {}),
			routeLeg: routeService,
		};

		if (routeService?.trade_type === 'export') {
			check = false;
			(serviceObj?.origin || []).forEach((obj) => {
				if (obj?.routeLeg?.display === serviceAvailable?.routeLeg?.display) {
					check = true;
				}
			});

			if (check === false) {
				serviceObj.origin.push(serviceAvailable);
			}
		}
		if (routeService?.trade_type === 'import') {
			check = false;
			(serviceObj?.destination || []).forEach((obj) => {
				if (obj?.routeLeg?.display === serviceAvailable?.routeLeg?.display) {
					check = true;
				}
			});
			if (check === false) {
				serviceObj.destination.push(serviceAvailable);
			}
		}

		if ('mainServices' in routeService) {
			routeService?.mainServices?.forEach((data) => {
				serviceAvailable = serviceList?.find(
					(element) => element?.display_service_type === data.service_types[0]
						&& element?.trade_type === data?.trade_type,
				);

				serviceAvailable = {
					...serviceAvailable,
					routeLeg: data,
				};

				const all_similar_services = serviceList?.filter(
					(element) => element?.trade_type === data?.trade_type
						&& element?.display_service_type === data.service_types[0],
				);

				if (all_similar_services?.length) {
					serviceObj.multipleMainService.push({
						services : all_similar_services,
						routeLeg : data,
					});
				}

				(serviceObj.mainService || []).forEach((obj) => {
					if (obj === serviceAvailable) {
						check = true;
					}
				});
				if (!check) {
					serviceObj.mainService.push(serviceAvailable);
				}
			});
		}
	};

	return {
		renderItem,
	};
};
