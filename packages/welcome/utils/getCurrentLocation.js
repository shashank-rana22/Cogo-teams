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

	const [coords, setCoords] = useState(null);
	const [timestamp, setTimestamp] = useState(null);
	const [positionError, setPositionError] = useState(null);
	const [permissionState, setPermissionState] = useState(null);

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
	}, [geolocationProvider, watchLocationPermissionChange]);

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
	}, [cancelUserDecisionTimeout, geolocationProvider,
		getPosition, permissionState, suppressLocationOnMount, watchPosition]);

	return {
		getPosition,
		coords,
		timestamp,
		isGeolocationEnabled,
		isGeolocationAvailable: Boolean(geolocationProvider),
		positionError,
	};
}

export const getCurrentLocation = () => new Promise((resolve, reject) => {
	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				resolve({ latitude, longitude });
			},
			(error) => {
				reject(error);
			},
		);
	} else {
		reject(new Error('Geolocation is not available.'));
	}
});
