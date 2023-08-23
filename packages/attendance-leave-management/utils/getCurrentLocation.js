import { Toast } from '@cogoport/components';
import { useEffect, useRef, useState, useCallback } from 'react';

const DEFAULT_TIMEOUT = 0;

export function useGeolocated(config = {}) {
	const {
		positionOptions = {
			enableHighAccuracy : true,
			maximumAge         : 0,
			timeout            : Infinity,
		},
		isOptimisticGeolocationEnabled = true,
		userDecisionTimeout = undefined,
		suppressLocationOnMount = false,
		watchPosition = false,
		geolocationProvider = typeof navigator !== 'undefined' ? navigator.geolocation : undefined,
		watchLocationPermissionChange = false,
		onError,
		onSuccess,
	} = config;

	const userDecisionTimeoutId = useRef(DEFAULT_TIMEOUT);
	const isCurrentlyMounted = useRef(true);
	const watchId = useRef();

	const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(isOptimisticGeolocationEnabled);

	const [coords, setCoords] = useState();
	const [timestamp, setTimestamp] = useState();
	const [positionError, setPositionError] = useState();
	const [permissionState, setPermissionState] = useState();

	const cancelUserDecisionTimeout = useCallback(() => {
		if (userDecisionTimeoutId.current) {
			window.clearTimeout(userDecisionTimeoutId.current);
		}
	}, []);

	const handlePositionError = useCallback(
		(error) => {
			cancelUserDecisionTimeout();
			if (isCurrentlyMounted.current) {
				setCoords(() => undefined);
				setIsGeolocationEnabled(false);
				setPositionError(error);
			}
			onError?.(error);
		},
		[onError, cancelUserDecisionTimeout],
	);

	const handlePositionSuccess = useCallback(
		(position) => {
			cancelUserDecisionTimeout();
			if (isCurrentlyMounted.current) {
				setCoords(position.coords);
				setTimestamp(position.timestamp);
				setIsGeolocationEnabled(true);
				setPositionError(() => undefined);
			}
			onSuccess?.(position);
		},
		[onSuccess, cancelUserDecisionTimeout],
	);

	const getPosition = useCallback(() => {
		if (!geolocationProvider || !geolocationProvider.getCurrentPosition || !geolocationProvider.watchPosition) {
			Toast.error('Please enable location');
		}

		if (userDecisionTimeout) {
			userDecisionTimeoutId.current = window.setTimeout(() => {
				handlePositionError();
			}, userDecisionTimeout);
		}

		if (watchPosition) {
			watchId.current = geolocationProvider.watchPosition(
				handlePositionSuccess,
				handlePositionError,
				positionOptions,
			);
		} else {
			geolocationProvider.getCurrentPosition(handlePositionSuccess, handlePositionError, positionOptions);
		}
	}, [
		geolocationProvider,
		watchPosition,
		userDecisionTimeout,
		handlePositionError,
		handlePositionSuccess,
		positionOptions,
	]);

	useEffect(() => {
		let permission;

		if (watchLocationPermissionChange && geolocationProvider && 'permissions' in navigator) {
			navigator.permissions
				.query({ name: 'geolocation' })
				.then((result) => {
					permission = result;
					if (permission?.state !== 'granted') {
						Toast.error('Please enable location');
					}
					permission.onchange = () => {
						setPermissionState(permission.state);
					};
				})
				.catch((e) => {
					console.error('Error updating the permissions', e);
				});
		}

		return () => {
			if (permission) {
				permission.onchange = null;
			}
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!suppressLocationOnMount) {
			getPosition();
		}

		return () => {
			cancelUserDecisionTimeout();
			if (watchPosition && watchId.current) {
				geolocationProvider?.clearWatch(watchId.current);
			}
		};
	}, [permissionState]); // eslint-disable-line react-hooks/exhaustive-deps

	return {
		getPosition,
		coords,
		timestamp,
		isGeolocationEnabled,
		isGeolocationAvailable: Boolean(geolocationProvider),
		positionError,
	};
}
