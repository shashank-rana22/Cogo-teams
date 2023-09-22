import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

import { DEFAULT_LNG_INDEX } from '../constant/mapConstant';
import calAirRoute from '../utils/calAirRoute';

const LAST_INDEX = -1;
const ONE = 1;
const FLAT_ORDER = 2;

const getUniqueArrElements = (arr) => arr.reduce((accumulator, current) => {
	const found = accumulator.some(
		(item) => JSON.stringify(item) === JSON.stringify(current),
	);
	if (!found) {
		accumulator.push(current);
	}
	return accumulator;
}, []);

const useGetMapRoute = ({ trackingInfo = [], type = 'ocean' }) => {
	const [allRoute, setAllRoute] = useState([]);

	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_multiple_sea_routes',
	}, { manual: true, autoCancel: false });

	const getSeaRoute = useCallback(async ({ coordinates = [] }) => {
		try {
			const resp = await trigger({
				params: {
					points: {
						coordinates,
					},
				},
			});
			const apiData = resp?.data || {};
			const routeInfo = apiData?.routes || [];
			const routeArr = (routeInfo || []).map((ele) => [ele?.route]).flat(FLAT_ORDER);
			const uniqueRouteArr = getUniqueArrElements(routeArr);

			return uniqueRouteArr;
		} catch (err) {
			console.error(err, 'err');
			return null;
		}
	}, [trigger]);

	const calcSeaRoute = useCallback(async () => {
		const promiseArr = (trackingInfo || []).map(async (ele) => {
			const { tracking_data = [] } = ele || {};

			const latLngArr = (tracking_data || [])
				.filter((info) => info?.latitude && info?.longitude)
				.map((info) => [+info.latitude, +info.longitude]);

			const uniqueLatLngArr = getUniqueArrElements(latLngArr);

			if (isEmpty(uniqueLatLngArr)) return undefined;
			if (uniqueLatLngArr.length === ONE) return uniqueLatLngArr;
			const value = await getSeaRoute(
				{ coordinates: [uniqueLatLngArr[GLOBAL_CONSTANTS.zeroth_index], ...uniqueLatLngArr.slice(LAST_INDEX)] },
			);
			return value;
		});

		const promiseValue = await Promise.allSettled(promiseArr);

		const mapPointArr = (trackingInfo || []).map((ele, index) => {
			const { container_no = '', searchValue = '', id = '' } = ele || {};
			const mapPoints = promiseValue?.[index]?.value;

			const isRouteAvaliable = promiseValue?.[index]?.status === 'fulfilled' && mapPoints;

			let updatedRoute = [];

			if (isRouteAvaliable) {
				updatedRoute = mapPoints.map((point) => ({
					lat : point[GLOBAL_CONSTANTS.zeroth_index],
					lng : point[DEFAULT_LNG_INDEX],
				}));
			}

			return {
				id,
				containerNo : container_no || searchValue,
				route       : updatedRoute,
			};
		});
		setAllRoute(mapPointArr);
	}, [trackingInfo, getSeaRoute]);

	useEffect(() => {
		if (!isEmpty(trackingInfo)) {
			if (type === 'ocean') {
				calcSeaRoute();
			} else {
				const allRouteArr = calAirRoute({ list: trackingInfo });
				setAllRoute(allRouteArr);
			}
		}
	}, [calcSeaRoute, trackingInfo, type]);

	return {
		loading, allRoute,
	};
};

export default useGetMapRoute;
