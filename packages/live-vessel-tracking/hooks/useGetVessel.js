import { useCallback, useEffect, useState } from 'react';

import {
	DEFAULT_NORTHEAST_LAT,
	DEFAULT_NORTHEAST_LNG,
	DEFAULT_SOUTHWEST_LAT,
	DEFAULT_SOUTHWEST_LNG,
} from '../constant/defaultLatLng';

import { useRequestBf } from '@/packages/request';

const MAX_VESSEL_INBOUND = 1000;

const getLatLng = ({ currentBounds = {} }) => {
	const { _northEast = {}, _southWest = {} } = currentBounds || {};
	const { lat: topLat, lng: rightLng } = _northEast || {};
	const { lat: bottomLat, lng: leftLng } = _southWest || {};

	return {
		topLat,
		leftLng,
		bottomLat,
		rightLng,
	};
};

const useGetVessel = () => {
	const [currentBounds, setCurrentBound] = useState({
		_northEast : { lat: DEFAULT_NORTHEAST_LAT, lng: DEFAULT_NORTHEAST_LNG },
		_southWest : { lat: DEFAULT_SOUTHWEST_LAT, lng: DEFAULT_SOUTHWEST_LNG },
	});

	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'get',
		url     : 'http://10.10.12.237:8099/ais/vessel/tracking-data',
		authKey : 'get_ais_vessel_tracking_data',
	}, { manual: true });

	const getVesselInfo = useCallback(() => {
		const { topLat, leftLng, bottomLat, rightLng } = getLatLng({
			currentBounds,
		});
		try {
			trigger({
				params: {
					limit           : MAX_VESSEL_INBOUND,
					top_latitude    : topLat,
					bottom_latitude : bottomLat,
					left_longitude  : leftLng,
					right_longitude : rightLng,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [currentBounds, trigger]);

	useEffect(() => {
		getVesselInfo();
	}, [currentBounds, getVesselInfo]);

	return {
		data,
		loading,
		setCurrentBound,
	};
};

export default useGetVessel;
